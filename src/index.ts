// Resources
import dotenv from "dotenv";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
dotenv.config();

// Interfaces
interface ExtendedClient extends Client {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commands: Collection<string, any>;
}

// Variables
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (user) => {
  console.log(`${user.user.tag} has come online!`);
});

(client as ExtendedClient).commands = new Collection();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const location = path.join(__dirname, "commands");
const cmds = fs.readdirSync(location);

for (const folder of cmds) {
  const cmdPath = path.join(location, folder);
  const files = fs.readdirSync(cmdPath).filter((file) => file.endsWith(".ts"));

  for (const file of files) {
    const filePath = path.join(cmdPath, file);
    const cmd = import(filePath);

    if ("data" in cmd && "execute" in cmd) {
      (client as ExtendedClient).commands.set(cmd.data.name, cmd);
    } else {
      console.log(`${filePath} is an invalid command file.`);
    }
  }
}

client.login(process.env.BOT_TOKEN);
export default client;
