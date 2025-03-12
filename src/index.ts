// Resources
import dotenv from "dotenv";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { ExtendedClient } from "./lib/interfaces";
import Events from "./components/client/Events";
import Commands from "./components/client/Commands";
dotenv.config(); // Make sure environment variables have been loaded (mostly used for production instances).

// Variables
const client: ExtendedClient = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as ExtendedClient; // Create the application client.
client.commands = new Collection();

// * Create and setup collection for commands.
const commands = new Commands("src/commands").load();
const events = new Events("src/events").load();

// * Login to the bot account.
client.login(process.env.BOT_TOKEN);
export { client, commands, events };
