// Resources
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../components/Command";
import Embed from "../../components/Embed";
import { client } from "../../index";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns how long the bot took to respond."),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply({
      embeds: [
        new Embed({
          description: `Latency: ${Math.round(client.ws.ping)}ms`,
        }),
      ],
    });
  },
});
