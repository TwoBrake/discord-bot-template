// Resources
import dotenv from "dotenv";
import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Interaction,
  MessageFlags,
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js";
import { fetchFiles, register } from "./lib/utils";
import { ExtendedClient, Command, Event } from "./lib/interfaces";
dotenv.config(); // Make sure environment variables have been loaded (mostly used for production instances).

// Variables
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Create the application client.
const commands: RESTPostAPIApplicationCommandsJSONBody[] = []; // Initialize an array of commands that will be registered when filled.

// * Tell the console that the bot has come online.
client.once(Events.ClientReady, (user) => {
  console.log(`${user.user.tag} has come online!`);
});

// * Create and setup collection for commands.
const rest = new REST().setToken(String(process.env.BOT_TOKEN));
(client as ExtendedClient).commands = new Collection();

fetchFiles("src/commands")
  .then((cmds) => {
    cmds = cmds as Command[];
    cmds.forEach((cmd) => {
      (client as ExtendedClient).commands.set(cmd.data.name, cmd);
      commands.push(cmd.data.toJSON());
    });
  })
  .then(async () => {
    await register(commands, rest); // Register all commands to client.
  });

// * Setup events.
fetchFiles("src/events").then((events) => {
  events = events as Event[];
  console.log(`Refreshing ${events.length} event(s).`);
  events.forEach((event) => {
    if (event.once) {
      client.once(event.event, (...args) => event.execute(...args));
    } else {
      client.on(event.event, (...args) => event.execute(...args));
    }
  });
  console.log(`Successfully refreshed ${events.length} event(s).`);
});

// * Listen for when an interaction is being created.
client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const cmd: Command | undefined = (client as ExtendedClient).commands.get(
    interaction.commandName
  );

  // If the command was for some reason not added to the collection, then make sure it can't execute it's execution function.
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
export default client as ExtendedClient;
