// Resources
import {
  CommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../../components/Command";
import config from "../../../config/bot";
import { commands } from "../..";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads commands and events."),
  execute: async (interaction: CommandInteraction) => {
    const runner = interaction.user;

    if (runner.id !== config.owner) {
      await interaction.reply({
        content:
          "You do not have the sufficient permissions to run this command.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    await commands.refresh();
    await interaction.editReply({
      content: "Successfully reloaded commands and events.",
    });
  },
  options: {
    ownerOnly: true,
  },
});
