// Resources
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

// Interfaces
interface CommandProps {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

/**
 * Creates a slash command instance.
 */
export default class Command {
  public readonly data: SlashCommandBuilder;
  public readonly execute: (interaction: CommandInteraction) => Promise<void>;

  /**
   * @param props The commands properties.
   */
  constructor(props: CommandProps) {
    this.data = props.data;
    this.execute = props.execute;
  }
}
