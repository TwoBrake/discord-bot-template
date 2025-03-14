// Resources
import {
  SlashCommandBuilder,
  CommandInteraction,
  Client,
  Collection,
  ClientEvents,
} from "discord.js";

export interface RestResponse {
  id: string;
}

export interface CommandOptions {
  developerOnly?: boolean; // Restricts the command to the owner ID provided in configuration.
  ownerOnly?: boolean; // Restricts the command to the owner of the guild.
  cooldown?: number;
}

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
  options?: CommandOptions;
}

export interface Event {
  event: keyof ClientEvents;
  once: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => void | Promise<void>;
}

export interface ExtendedClient extends Client {
  commands: Collection<string, Command>;
  cooldowns: Collection<string, Collection<string, Date>>;
}
