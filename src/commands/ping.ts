// Resources
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns a response."),
  async (interaction: CommandInteraction) => {
    await interaction.reply(`Hey there ${interaction.user.tag}!`);
  },
];
