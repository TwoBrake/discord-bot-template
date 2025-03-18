// Resources
import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from "discord.js";
import Command from "../../components/Command";
import Embed, { EmbedType } from "../../components/Embed";
import { commands } from "../..";
import { PublishType } from "../../components/client/Commands";

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

    switch (subcommand) {
      case "reload":
        await reload(interaction);
        break;
      case "publish":
        await publish(interaction);
        break;
    }
  },
  options: {
    ownerOnly: true,
  },
});

async function reload(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  try {
    await commands.refresh();
    await interaction.editReply({
      embeds: [
        new Embed({
          description: "Successfully reloaded commands and events.",
          level: EmbedType.Success,
        }),
      ],
    });
  } catch (e) {
    console.error(e);
    await interaction.editReply({
      embeds: [
        new Embed({
          description: "Something went wrong, check the console for details.",
          level: EmbedType.Error,
        }),
      ],
    });
  }
}

async function publish(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  try {
    await commands.load(PublishType.Global);
    await interaction.editReply({
      embeds: [
        new Embed({
          description:
            "Successfully published commands globally to the client.",
          level: EmbedType.Success,
        }),
      ],
    });
  } catch (e) {
    console.error(e);
    await interaction.editReply({
      embeds: [
        new Embed({
          description: "Something went wrong, check the console for details.",
          level: EmbedType.Error,
        }),
      ],
    });
  }
}
