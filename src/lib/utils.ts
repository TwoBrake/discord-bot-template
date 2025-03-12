// Resources
import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import config from "../../config/bot.json";
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { Command, Event } from "./interfaces";

// Types
type Extension = ".ts" | ".js";

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
    await rest.put(
      Routes.applicationGuildCommands(config.client, config.guild),
      { body: cmds }
    );
  } catch (e) {
    console.error(e);
  }
}

/**
 * Fetches the files in a specific directory.
 * @param filesPath The path to the directory to search in.
 * @param extension The extension of the files to filter (default is .ts).
 * @returns {Promise<Command[] | Event[]>} An array of all the files and their data.
 */
export async function fetchFiles(
  filesPath: string,
  extension?: Extension
): Promise<Command[] | Event[]> {
  extension = extension || ".ts";

  const theFiles: Command[] | Event[] = [];
  const location = path.join(process.cwd(), filesPath);
  const cmds = fs.readdirSync(location);

  // * Get command files from commands folder.
  for (const folder of cmds) {
    const cmdPath = path.join(location, folder);
    const files = fs
      .readdirSync(cmdPath)
      .filter((file) => file.endsWith(extension));

    for (const file of files) {
      const filePath = path.join(cmdPath, file);
      await import(pathToFileURL(filePath).href)
        .then((mod) => {
          const file: Command | Event = mod.default;
          theFiles.push(file as Command & Event);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  return theFiles;
}
