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

/** Used for a base for Rest API responses (we only need the ID). */
export interface RestResponse {
  /** The ID of the Rest Response. */
  id: string;
}

/** The structure of a command. */
export interface Command {
  /** The slash command data, containing the name, description, etc. */
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  /** A function that defines what happens once the command is ran. */
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  /** Custom options for the command. */
  options?: CommandOptions;
}

/** The structure of a command's options. */
export interface CommandOptions {
  /** Whether or not the command is restricted to a bots developer (provided in the configuration). */
  developerOnly?: boolean;
  /** Whether or not the command is restricted to the bots owner. */
  ownerOnly?: boolean;
  /** A cooldown for the command in milliseconds. */
  cooldown?: number;
}

/** The structure of an event. */
export interface Event {
  /** The type of event (eg. member join). */
  event: keyof ClientEvents;
  /** Whether the event should be disconnected after its first run or not. */
  once: boolean;
  /** A function determining what should happen when the event is triggered. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => void | Promise<void>;
}

/** A modified client built for the Discord bot template, allowing for commands and cooldowns to be added to the client class. */
export interface ExtendedClient extends Client {
  /** A collection of commands. */
  commands: Collection<string, Command>;
  /** A collection of cooldowns. */
  cooldowns: Collection<string, Collection<string, Date>>;
}

/** The structure of an access manager. */
export interface AccessManagerOptions {
  botOwner?: boolean;
  botDev?: boolean;
  owner?: boolean;
  roles?: string[];
  users?: string[];
  other?: boolean[];
}

/** The structure of the configuration of the bot. */
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
