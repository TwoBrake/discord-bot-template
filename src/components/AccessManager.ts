// Resources
import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  CommandInteraction,
  Interaction,
  ModalSubmitInteraction,
} from "discord.js";
import config from "../../config/bot";

// Types
type Interactions =
  | Interaction
  | CommandInteraction
  | ModalSubmitInteraction
  | ButtonInteraction
  | AnySelectMenuInteraction;

type Function = () => void | (() => Promise<void>);

// Interfaces
interface AccessManagerProps {
  botOwner?: boolean;
  botDev?: boolean;
  owner?: boolean;
  roles?: string[];
  users?: string[];
  other?: boolean[];
}

export default class AccessManager {
  private readonly interaction: Interactions;
  private readonly options: AccessManagerProps;

  constructor(interaction: Interactions, props: AccessManagerProps) {
    this.interaction = interaction;
    this.options = props;
  }

  /**
   * Returns a boolean on whether or not the interaction has the permission.
   * @returns {boolean} Whether or not it was successful.
   */
  public has(): boolean {
    return this.runChecks();
  }

  /**
   * Allows you to run a function if the authentication is successful.
   * @param fn The function to run upon success.
   */
  public restrict(fn: Function): void {
    if (this.runChecks()) {
      fn();
    }
  }

  /**
   * Runs internal checks.
   * @returns {boolean} Whether or not it was successful.
   */
  private runChecks(): boolean {
    const user = this.interaction.user;
    const guild = this.interaction.guild;
    const member = guild?.members.cache.get(user.id);

    // * If not user is found, bail out early.
    if (!user) return false;

    const isBotOwner = user.id === config.owner;
    const isDev = config.developers.includes(user.id);
    const isGuildOwner = user.id === guild?.ownerId;

    // * If user is bot owner, then return early because they are the owner, they have access to everything!
    if (this.options.botOwner && isBotOwner) return true;

    // * If user is bot developer, they should have access to everything for testing purposes.
    if (this.options.botDev && isDev) return true;

    // * If user is guild owner, they should have access over everything.
    if (this.options.owner && isGuildOwner) return true;

    // * Check if user has roles.
    if (this.options.roles) {
      if (!guild || !member) return false;

      member.roles.cache.forEach((role) => {
        if (this.options.roles?.includes(role.id)) {
          return true;
        }
      });
    }

    // * Check users.
    if (this.options.users && this.options.users.includes(user.id)) return true;

    // * Check other variables.
    const allTrue = this.options.other?.forEach((val) => {
      if (!val) return false;
    });
    if (allTrue) return true;

    // * If any of the checks somehow get here, return false.
    return false;
  }
}
