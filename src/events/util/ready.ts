// Resources
import { Client, Events } from "discord.js";
import Event from "../../components/Event";

export default new Event({
  event: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    if (!client.user) return;

    console.log(client.user.tag);
  },
});
