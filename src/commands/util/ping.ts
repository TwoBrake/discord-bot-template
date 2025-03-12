// Resources
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns a response."),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply(`Hey there ${interaction.user.tag}!`);
  },
};
