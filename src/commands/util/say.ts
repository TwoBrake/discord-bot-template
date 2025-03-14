// Resources
import {
  ActionRowBuilder,
  CommandInteraction,
  MessageFlags,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import Command from "../../components/Command";
import ComponentListener, {
  ComponentListenerEvent,
  ComponentListenerInteraction,
} from "../../components/ComponentListener";
import Embed from "../../components/Embed";

// Variables
const modalListen = new ComponentListener(
  "say",
  ComponentListenerInteraction.Modal
);
modalListen.on(
  ComponentListenerEvent.OnCreate,
  async (interaction: ModalSubmitInteraction) => {
    const channel: TextChannel = interaction.channel as TextChannel;
    const msg: string = interaction.fields.getTextInputValue("msg");

    if (!msg) {
      await interaction.reply({
        content: "You must provide a message.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    channel.send({
      embeds: [
        new Embed({
          title: `Message from ${interaction.user.tag}`,
          description: msg,
        }),
      ],
    });

    await interaction.reply({
      embeds: [
        new Embed({
          description: "The operation was successful.",
          level: "success",
        }),
      ],
      flags: MessageFlags.Ephemeral,
    });
  }
);

export default new Command({
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Makes the bot say something in the channel."),
  execute: async (interaction: CommandInteraction) => {
    const input = new TextInputBuilder()
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("Hey ...")
      .setCustomId("msg")
      .setMinLength(1)
      .setMaxLength(200)
      .setLabel("Message")
      .setRequired(true);
    const row = new ActionRowBuilder<TextInputBuilder>().addComponents(input);
    const modal = new ModalBuilder()
      .setCustomId("say")
      .setTitle("Say")
      .addComponents([row]);

    await interaction.showModal(modal);
  },
});
