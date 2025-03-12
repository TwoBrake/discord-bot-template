// Resources
import { Events, Interaction, MessageFlags } from "discord.js";
import { client } from "../..";
import Event from "../../components/Event";
import { Command } from "../../lib/interfaces";

export default new Event({
  event: Events.InteractionCreate,
  once: false,
  execute: async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const cmd: Command | undefined = client.commands.get(
      interaction.commandName
    );

    // If the command was for some reason not added to the collection, then make sure it can't execute it's execution function.
    if (!cmd) {
      console.error(
        `${interaction.commandName} was not found in the collection.`
      );
      return;
    }

    try {
      await cmd.execute(interaction);
    } catch (e) {
      console.error(e);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Internal server error.",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "Internal server error.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
});
