// Resources
import * as dotenv from "dotenv";
import { Client, Collection } from "discord.js";
import { ExtendedClient } from "./lib/interfaces";
import Events from "./components/client/Events";
import Commands from "./components/client/Commands";
import config from "../config/bot";
import { logger } from "./lib/logger";
import death from "death";
dotenv.config(); // Make sure environment variables have been loaded (mostly used for production instances).

// Variables
const client: ExtendedClient = new Client({
  intents: config.intents,
}) as ExtendedClient; // Create the application client.
client.commands = new Collection();

// * Create commands and events from default folders.
const commands = new Commands("src/commands");
const events = new Events("src/events");
commands.load();
events.load();

// * Login to the bot account.
client.login(process.env.BOT_TOKEN);
export { client, commands, events };

// * Listen for when the terminals session ends and cleanup client accordingly.
death(() => {
  logger.error(`Shutting down ${client.user?.tag}.`);
  client.destroy();
  process.exit(0);
});
