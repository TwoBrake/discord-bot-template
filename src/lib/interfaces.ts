// Resources
import {
  SlashCommandBuilder,
  CommandInteraction,
  Events,
  Client,
  Collection,
} from "discord.js";

export interface RestResponse {
  id: string;
}

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export interface Event {
  event: keyof typeof Events;
  once: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => void;
}

export interface ExtendedClient extends Client {
  commands: Collection<string, Command>;
}
