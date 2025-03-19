// Resources
import {
  SlashCommandBuilder,
  Client,
  Collection,
  ClientEvents,
  SlashCommandSubcommandsOnlyBuilder,
  ChatInputCommandInteraction,
  GatewayIntentBits,
} from "discord.js";

// * Used for a base for Rest API responses (we only need the ID).
export interface RestResponse {
  id: string;
}

// * Used for defining what a commands structure looks like.
export interface Command {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  options?: CommandOptions;
}

// * Used for defining what a command can take as their options.
export interface CommandOptions {
  developerOnly?: boolean; // Restricts the command to the owner ID provided in configuration.
  ownerOnly?: boolean; // Restricts the command to the owner of the guild.
  cooldown?: number;
}

// * Used for defining what an events structure looks like.
export interface Event {
  event: keyof ClientEvents;
  once: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => void | Promise<void>;
}

// * Used for defining extra options on the client.
export interface ExtendedClient extends Client {
  commands: Collection<string, Command>;
  cooldowns: Collection<string, Collection<string, Date>>;
}

// * Used for defining the options of an access manager instance.
export interface AccessManagerOptions {
  botOwner?: boolean;
  botDev?: boolean;
  owner?: boolean;
  roles?: string[];
  users?: string[];
  other?: boolean[];
}

// * Used for the configuration.
export interface Configuration {
  guild: string;
  owner: string;
  developers: string[];
  intents: GatewayIntentBits[];
  theme: {
    info: string;
    success: string;
    warn: string;
    error: string;
  };
}
