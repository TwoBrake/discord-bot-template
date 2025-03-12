// Resources
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns a response."),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply(`Hey there ${interaction.user.tag}!`);
  },
};
