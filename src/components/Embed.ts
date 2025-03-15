// Resources
import { EmbedBuilder, EmbedData } from "discord.js";
import config from "../../config/bot";
import { client } from "../index";

// Enums
export enum EmbedType {
  Info = "info",
  Success = "success",
  Warn = "warn",
  Error = "error",
}

// Interfaces
interface MyEmbedData extends EmbedData {
  level?: EmbedType;
}

/**
 * Creates an embed.
 */
export default class Embed {
  /**
   * @param data The embeds data.
   */
  constructor(data: MyEmbedData) {
    data.level = data.level || EmbedType.Info;
    const embed = new EmbedBuilder(data as EmbedData);

    // * Apply default options if they are not provided.
    if (!data.footer) {
      embed.setFooter({
        text: client.user?.displayName || "A cool bot.",
        iconURL: client.user?.avatarURL() || "",
      });
    }

    if (!data.timestamp) {
      embed.setTimestamp(Date.now());
    }

    if (!data.color) {
      embed.setColor(config.theme[data.level.valueOf()]);
    }

    if (!data.author) {
      embed.setAuthor({ name: "Template Bot" });
    }

    return embed.data;
  }
}
