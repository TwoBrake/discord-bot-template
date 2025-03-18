// Resources
import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import config from "../../config/bot";
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { Command, Event } from "./interfaces";
import { PublishType } from "../components/client/Commands";
import { logger } from "./logger";

// Types
type Extension = ".ts" | ".js";

/**
 * Registers an array of slash commands.
 * @param cmds The array of commands.
 * @param rest The REST API instance.
 */
export async function register(
  cmds: RESTPostAPIApplicationCommandsJSONBody[],
  rest: REST,
  type: PublishType
): Promise<void> {
  try {
    if (type === PublishType.Global) {
      await rest.put(Routes.applicationCommands(config.client), { body: cmds });
    } else {
      await rest.put(
        Routes.applicationGuildCommands(config.client, config.guild),
        { body: cmds }
      );
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * Recursively fetches files from a directory and its subdirectories.
 * @param dir The directory to search in.
 * @param extension The extension of the files to filter.
 * @returns {Promise<string[]>} An array of file paths.
 */
async function fetchFilesRecursively(
  dir: string,
  extension: Extension
): Promise<string[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? fetchFilesRecursively(res, extension) : res;
    })
  );
  return Array.prototype
    .concat(...files)
    .filter((file) => file.endsWith(extension));
}

/**
 * Fetches the files in a specific directory.
 * @param filesPath The path to the directory to search in.
 * @param extension The extension of the files to filter (default is .ts).
 * @returns {Promise<Command[] | Event[]>} An array of all the files and their data.
 */
export async function fetchFiles(
  filesPath: string,
  extension: Extension = ".ts"
): Promise<Command[] | Event[]> {
  const theFiles: Command[] | Event[] = [];
  const location = path.join(process.cwd(), filesPath);
  const files = await fetchFilesRecursively(location, extension);

  for (const filePath of files) {
    await import(pathToFileURL(filePath).href)
      .then((mod) => {
        const file: Command | Event = mod.default;

        // * Make sure file is a valid command or event.
        if (mod.default.execute) {
          theFiles.push(file as Command & Event);
        } else {
          logger.warn(`'${filePath}' is not a valid command or event.`);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return theFiles;
}
