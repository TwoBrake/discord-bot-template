// Resources
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../components/Command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("cmds")
    .setDescription("Handles all command related actions.")
    .addSubcommand((reload) =>
      reload
        .setName("reload")
        .setDescription("Reloads all slash commands to the development guild.")
    )
    .addSubcommand((publish) =>
      publish
        .setName("publish")
        .setDescription("Publishes all slash commands globally.")
    ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand();

    // switch (subcommand) {
    //   case "reload":
    //     () => {
    //       console.log("test");
    //     };
    // }

    await interaction.reply(subcommand);
  },
  options: {
    ownerOnly: true,
  },
});
