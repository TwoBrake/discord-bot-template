// Resources
import { Client, Events } from "discord.js";
import Event from "../../components/Event";
import { logger } from "../../lib/logger";

export default new Event({
  event: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    if (!client.user) return;

    logger.info(`${client.user.tag} has successfully come online!`);
  },
});
