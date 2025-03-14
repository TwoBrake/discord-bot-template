// Resources
import { Collection, Events, Interaction, MessageFlags } from "discord.js";
import { client } from "../..";
import Event from "../../components/Event";
import { Command } from "../../lib/interfaces";
import { logger } from "../../lib/logger";
import config from "../../../config/bot";

export default new Event({
  event: Events.InteractionCreate,
  once: false,
  execute: async (interaction: Interaction) => {
    // * Make sure the command is a slash command.
    if (!interaction.isChatInputCommand()) return;

    const cmd: Command | undefined = client.commands.get(
      interaction.commandName
    );

    // * If command is not in client commands collection, then bail out early.
    if (!cmd) {
      logger.error(
        `${interaction.commandName} was not found in the collection.`
      );
      return;
    }

    try {
      // * Run checks for command options.
      if (cmd.options) {
        const owner = config.owner === interaction.user.id;

        if (cmd.options.ownerOnly && !owner) {
          await interaction.reply({
            content: "You must be the bots owner to run this command.",
            flags: MessageFlags.Ephemeral,
          });
          return;
        }

        if (cmd.options.developerOnly && !owner) {
          if (!config.developers.includes(interaction.user.id)) {
            await interaction.reply({
              content: "You must be a bot developer to run this command.",
              flags: MessageFlags.Ephemeral,
            });
            return;
          }
        }

        if (cmd.options.cooldown) {
          client.cooldowns.set(cmd.data.name, new Collection());

          const now = new Date();
          const timestamps = client.cooldowns.get(cmd.data.name);

          if (timestamps?.has(interaction.user.id)) {
            const expiration =
              timestamps.get(interaction.user.id) || 0 + cmd.options.cooldown;

            if (now < expiration) {
              await interaction.reply({
                content: "You are on cooldown for this command.",
                flags: MessageFlags.Ephemeral,
              });
              return;
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(
              () => timestamps.delete(interaction.user.id),
              cmd.options.cooldown
            );
          }
        }
      }

      // * Execute the command if checks succeed.
      await cmd.execute(interaction);
    } catch (e) {
      // * Handle any and all command related errors.
      logger.error(e);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Internal server error.",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "Internal server error.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
});
