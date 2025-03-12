// Resources
import EventEmitter from "node:events";
import { client } from "../index";
import { Events, Interaction } from "discord.js";

// Types
// type ComponentType =
//   | "select"
//   | "button"
//   | "context"
//   | "command"
//   | "autocomplete"
//   | "any";

// Variables
export const Types = {
  OnCreate: Symbol("create"),
};

export default class ComponentListener extends EventEmitter {
  private readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;

    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (!interaction.isModalSubmit()) return; // TODO: Later allow for different types of interactions from type commented out above.

      if (this.id === interaction.customId) {
        this.emit(Types.OnCreate, interaction);
      }
    });
  }
}
