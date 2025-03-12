// Resources
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../components/Command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns a response."),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply(`Hey there ${interaction.user.tag}!`);
  },
});

// export default {
//   data: new SlashCommandBuilder()
//     .setName("ping")
//     .setDescription("Returns a response."),
//   execute: async (interaction: CommandInteraction) => {
//     await interaction.reply(`Hey there ${interaction.user.tag}!`);
//   },
// };
