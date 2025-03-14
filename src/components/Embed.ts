// Resources
import { ColorResolvable, EmbedBuilder, EmbedData } from "discord.js";
import config from "../../config/bot";

// Interfaces
interface MyEmbedData extends EmbedData {
  level?: "success" | "info" | "warn" | "error";
}

/**
 * Creates an embed.
 */
export default class Embed {
  /**
   * @param data The embeds data.
   */
  constructor(data: MyEmbedData) {
    data.level = data.level || "info";
    const embed = new EmbedBuilder(data as EmbedData);

    // * Apply default options if they are not provided.
    if (!data.footer) {
      embed.setFooter({ text: "Template Bot" });
    }

    if (!data.color) {
      switch (data.level) {
        case "info":
          embed.setColor(config.theme.info as ColorResolvable);
          break;
        case "success":
          embed.setColor(config.theme.success as ColorResolvable);
          break;
        case "warn":
          embed.setColor(config.theme.warn as ColorResolvable);
          break;
        case "error":
          embed.setColor(config.theme.error as ColorResolvable);
          break;
      }
    }

    if (!data.author) {
      embed.setAuthor({ name: "Template Bot" });
    }

    return embed.data;
  }
}
