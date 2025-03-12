// Resources
import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import config from "../../config/bot.json";

/**
 * Registers an array of slash commands.
 * @param cmds The array of commands.
 * @param rest The REST API instance.
 */
export async function register(
  cmds: RESTPostAPIApplicationCommandsJSONBody[],
  rest: REST
): Promise<void> {
  try {
    console.log(`Refreshing ${cmds.length} application commands.`);

    const data: Promise<unknown>[] = await rest.put(
      Routes.applicationGuildCommands(config.client, config.guild),
      { body: cmds }
    );

    console.log(`Successfully refreshed ${data.length} application commands.`);
  } catch (e) {
    console.error(e);
  }
}
