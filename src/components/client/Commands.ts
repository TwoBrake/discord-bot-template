// Resources
import { fetchFiles, register } from "../../lib/utils";
import Command from "../Command";
import { client } from "../..";
import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import { logger } from "../../lib/logger";
import config from "../../../config/bot";

/**
 * Allows you to load commands from a specific directory.
 */
export default class Commands {
  private readonly path: string;
  private toRegister: RESTPostAPIApplicationCommandsJSONBody[] = [];
  private readonly rest = new REST().setToken(String(process.env.BOT_TOKEN));

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
  public async refresh(): Promise<void> {
    client.commands.clear();
    await this.rest
      .put(Routes.applicationGuildCommands(config.client, config.guild), {
        body: [],
      })
      .then(async () => {
        logger.error("DELETED ALL COMMANDS FOR RELOAD");
        await this.registerCmds();
      })
      .catch((e) => {
        logger.error(String(e));
      });
  }

  /**
   * Registers the commands.
   */
  private async registerCmds(): Promise<void> {
    this.toRegister = []; // Clear the to be registered commands array before registering any commands.
    try {
      const cmds: Command[] = (await fetchFiles(this.path)) as Command[];
      logger.info(`Began refreshing ${cmds.length} slash command(s).`);
      cmds.forEach((cmd) => {
        client.commands.set(cmd.data.name, cmd);
        this.toRegister.push(cmd.data.toJSON());
      });
      await register(this.toRegister, this.rest);
      logger.success(
        `Finished refreshing ${this.toRegister.length} slash command(s).`
      );
    } catch (e) {
      logger.error(String(e));
    }
  }
}
