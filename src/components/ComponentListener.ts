// Resources
import EventEmitter from "node:events";
import { client } from "../index";
import { Events, Interaction } from "discord.js";

// Variables
export enum ComponentListenerEvent {
  OnCreate = "create",
}

export enum ComponentListenerInteraction {
  Select,
  Button,
  Context,
  Command,
  Modal,
  Autocomplete,
  Any,
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

function getEquivalent(
  interaction: Interaction,
  type: ComponentListenerInteraction
): boolean {
  switch (type) {
    case ComponentListenerInteraction.Button:
      return interaction.isButton();
    case ComponentListenerInteraction.Autocomplete:
      return interaction.isAutocomplete();
    case ComponentListenerInteraction.Command:
      return interaction.isChatInputCommand();
    case ComponentListenerInteraction.Context:
      return interaction.isContextMenuCommand();
    case ComponentListenerInteraction.Modal:
      return interaction.isModalSubmit();
    case ComponentListenerInteraction.Select:
      return interaction.isAnySelectMenu();
    case ComponentListenerInteraction.Any:
      return true;
  }
}
