// Resources
import {
  ActionRowBuilder,
  CommandInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import Command from "../../components/Command";
import ComponentListener, { Types } from "../../components/ComponentListener";

// Variables
const modalListen = new ComponentListener("say");
modalListen.on(Types.OnCreate, async (interaction: ModalSubmitInteraction) => {
  await interaction.reply("hey");
});

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
      .setLabel("Message");
    const row = new ActionRowBuilder<TextInputBuilder>().addComponents(input);
    const modal = new ModalBuilder()
      .setCustomId("say")
      .setTitle("Say")
      .addComponents([row]);

    await interaction.showModal(modal);
  },
});
