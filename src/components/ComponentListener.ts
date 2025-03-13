// Resources
import EventEmitter from "node:events";
import { client } from "../index";
import { Events, Interaction } from "discord.js";

// Variables
export const EventType = {
  OnCreate: Symbol("create"),
};

export const ComponentType = {
  Select: Symbol("select"),
  Button: Symbol("button"),
  Context: Symbol("context"),
  Command: Symbol("command"),
  Autocomplete: Symbol("autocomplete"),
  Any: Symbol("any"),
};

/**
 * Creates a component listener instance.
 */
export default class ComponentListener extends EventEmitter {
  private readonly id: string;

  /**
   * @param id The ID of the interaction to listen for.
   */
  constructor(id: string) {
    super();
    this.id = id;

    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (!interaction.isModalSubmit()) return; // TODO: Later allow for different types of interactions from type commented out above.

      if (this.id === interaction.customId) {
        this.emit(EventType.OnCreate, interaction);
      }
    });
  }
}
