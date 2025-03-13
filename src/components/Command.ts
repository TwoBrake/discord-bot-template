// Resources
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import * as Interfaces from "../lib/interfaces";

/**
 * Creates a slash command instance.
 */
export default class Command {
  public readonly data: SlashCommandBuilder;
  public readonly execute: (interaction: CommandInteraction) => Promise<void>;
  public readonly options: Interfaces.CommandOptions;

  /**
   * @param props The commands properties.
   */
  constructor(props: Interfaces.Command) {
    this.data = props.data;
    this.execute = props.execute;
    this.options = props.options || {};
  }
}
