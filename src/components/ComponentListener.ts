// Resources
import EventEmitter from "node:events";
import { client } from "../index";
import { Events, Interaction, InteractionType } from "discord.js";

// Variables
export enum ComponentListenerEvent {
  OnCreate = "create",
}

export enum ComponentListenerInteraction {
  Select = "select",
  Button = "button",
  Context = "context",
  Command = InteractionType.ApplicationCommand,
  Modal = InteractionType.ModalSubmit,
  Autocomplete = InteractionType.ApplicationCommandAutocomplete,
  Any = "any",
}

/**
 * Creates a component listener instance.
 */
export default class ComponentListener extends EventEmitter {
  private readonly id: string;
  private readonly interactionType: ComponentListenerInteraction;

  /**
   * @param id The ID of the interaction to listen for.
   */
  constructor(id: string) {
    super();
    this.id = id;

    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (!interaction.isModalSubmit()) return; // TODO: Later allow for different types of interactions from type commented out above.

      if (this.id === interaction.customId) {
        this.emit(ComponentListenerEvent.OnCreate, interaction);
      }
    });
  }
}

function getEquivalent(interaction: Interaction): boolean {
  return interaction ? true : false;
}
