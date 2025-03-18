# Discord Bot Template

A simple template for a Discord bot utilizing the [**Discord.js**](https://discord.js.org) framework. Completely written in **TypeScript**.

## Features

- **Command Handler**: Easily create and manage commands.
- **Event Handler**: Automatically load and handle events.
- **TypeScript**: Utilize the power of TypeScript.
- **Configuration**: Easy access to configuration values.
- **Logging**: Simple and easy to read logging system.
- and more...

## Getting Started

1. Clone the repository: `git clone https://github.com/TwoBrake/discord-bot-template`.
2. Install dependencies:

```bash
npm install
```

3. Initialize your local environment files by cloning the example file and initialize your configuration from the example:

```bash
cp .env.example .env && cp config/example.bot.ts config/bot.ts
```

4. It's as simple as that! You can now start the bot:

```bash
npm run dev
```

or in production:

```bash
npm run build && npm run start
```

## Documentation

This is a template for developing Discord bots using the Discord.js framework, however, we have built our own internal methods and functions to make the development process as simple as possible. This article will cover the basics of some of these methods and functions.

**ComponentListener**:
This class allows you to listen for component interactions such as button clicks and modal submits.

```typescript
import ComponentListener, {
  ComponentListenerEvent,
} from "../path/to/ComponentListener";

const event = new ComponentListener("myId", ComponentListenerInteraction.Modal);

event.on(
  ComponentListenerEvent.OnCreate,
  async (interaction: ModalSubmitInteraction) => {
    await interaction.reply("We have received your submission!");
  }
);
```

**Commands**:
This class allows you to define different directories for your commands and automatically load them.

```typescript
import Commands from "../path/to/Commands";

const commands = new Commands("src/commands");
commands.load(); // Loads all commands.
commands.refresh(); // Reloads all commands.
```

**Events**:
This class allows you to define different directories for your events and automatically load them.

```typescript
import Events from "../path/to/Events";

const events = new Events("src/events");
events.load(); // Loads all events.
```

**Command**:
This class allows you to define a command, its properties, and its execution.

```typescript
import Command from "../path/to/Command";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply("Pong!");
  },
});
```

**Event**:
This class allows you to define an event and its execution.

```typescript
import Event from "../path/to/Event";

export default new Event({
  event: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    console.log(`Logged in as ${client.user?.tag}`);
  },
});
```

**AccessManager**:
This class allows you to manage access to commands and events.

```typescript
import AccessManager from "../path/to/AccessManager";

const auth = new AccessManager(interaction, {
  ownerOnly: true,
});

if (!auth.has()) return; // Authorization failed.

auth.restrict(() => {
  console.log("You can also do it like this!");
});
```
