// Resources
import dotenv from "dotenv";
import {
  Client,
  Collection,
  CommandInteraction,
  Events,
  GatewayIntentBits,
  Interaction,
  MessageFlags,
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js";
import { register } from "./lib/utils";
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
dotenv.config(); // Make sure environment variables have been loaded (mostly used for production instances).

// Interfaces
interface ExtendedClient extends Client {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commands: Collection<string, any>;
}

interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

// Variables
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Create the application client.
const commands: RESTPostAPIApplicationCommandsJSONBody[] = []; // Initialize an array of commands that will be registered when filled.

// * Tell the console that the bot has come online.
client.once(Events.ClientReady, (user) => {
  console.log(`${user.user.tag} has come online!`);
});

// * Create and setup collection for commands.
(client as ExtendedClient).commands = new Collection();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const location = path.join(__dirname, "commands");
const cmds = fs.readdirSync(location);
const rest = new REST().setToken(String(process.env.BOT_TOKEN));

// * Get command files from commands folder.
for (const folder of cmds) {
  const cmdPath = path.join(location, folder);
  const files = fs.readdirSync(cmdPath).filter((file) => file.endsWith(".ts"));

  for (const file of files) {
    const filePath = path.join(cmdPath, file);
    import(pathToFileURL(filePath).href)
      .then((mod) => {
        const cmd: Command = mod.data as Command;
        (client as ExtendedClient).commands.set(cmd.data.name, cmd);
        commands.push(cmd.data.toJSON());
      })
      .catch((e) => {
        console.error(e);
      })
      .then(async () => {
        await register(commands, rest);
      });
  }
}

// * Listen for when an interaction is being created.
client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const cmd: Command = (client as ExtendedClient).commands.get(
    interaction.commandName
  );

  if (!cmd) {
    console.error(
      `${interaction.commandName} was not found in the collection.`
    );
    return;
  }

  try {
    await cmd.execute(interaction);
  } catch (e) {
    console.error(e);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "Internal server error.",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "Internal server error.",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

// * Login to the bot account.
client.login(process.env.BOT_TOKEN);
export default client;
