// Resources
import { Client, Events } from "discord.js";

export default {
  event: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    if (!client.user) return;

    console.log(client.user.tag);
  },
};
