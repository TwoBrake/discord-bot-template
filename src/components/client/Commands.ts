// Resources
import { fetchFiles, register } from "../../lib/utils";
import Command from "../Command";
import { client } from "../..";
import {
  Collection,
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js";
import { logger } from "../../lib/logger";

/**
 * Allows you to load commands from a specific directory.
 */
export default class Commands {
  private readonly path: string;
  private toRegister: RESTPostAPIApplicationCommandsJSONBody[] = [];
  private rest = new REST().setToken(String(process.env.BOT_TOKEN));

  /**
   * @param path The path to search in.
   */
  constructor(path: string) {
    this.path = path;
  }

  /**
   * Loads the command files.
   */
  public load(): void {
    this.registerCmds();
  }

  /**
   * Refreshes the command files.
   */
  public refresh(): void {
    client.commands = new Collection();
    this.registerCmds();
  }

  /**
   * Registers the commands.
   */
  private registerCmds(): void {
    fetchFiles(this.path)
      .then((cmds) => {
        logger.info(`Began refreshing ${cmds.length} slash command(s).`);
        cmds = cmds as Command[];
        cmds.forEach((cmd) => {
          client.commands.set(cmd.data.name, cmd);
          this.toRegister.push(cmd.data.toJSON());
        });
      })
      .catch((e) => {
        logger.error(String(e));
      })
      .then(async () => {
        await register(this.toRegister, this.rest);
        logger.info(
          `Finished refreshing ${this.toRegister.length} slash command(s).`
        );
      })
      .catch((e) => {
        logger.error(String(e));
      });
  }
}
