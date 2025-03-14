// Resources
import EventEmitter from "node:events";
import { client } from "../index";
import { Events, Interaction, ModalSubmitInteraction } from "discord.js";

// Enums
export enum ComponentListenerEvent {
  OnCreate = "create",
}

export enum ComponentListenerInteraction {
  Select,
  Button,
  Context,
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
  constructor(id: string, interactionType: ComponentListenerInteraction) {
    super();
    this.id = id;
    this.interactionType = interactionType;

    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (!getEquivalent(interaction, this.interactionType)) return; // TODO: Later allow for different types of interactions from type commented out above.

      if (this.id === (interaction as ModalSubmitInteraction).customId) {
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
