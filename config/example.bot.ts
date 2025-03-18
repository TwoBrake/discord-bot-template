// Resources
import { GatewayIntentBits } from "discord.js";

export default {
  guild: "DEVELOPMENT_GUILD_ID",
  owner: "BOT_OWNER_ID",
  developers: ["A_DEVELOPER_ID"],
  intents: [GatewayIntentBits.Guilds],
  theme: {
    info: "#121212",
    success: "#16a34a",
    warn: "#f59e0b",
    error: "#dc2626",
  },
};
