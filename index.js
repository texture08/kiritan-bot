const {
  GatewayIntentBits,
  Collection,
  Partials,
  Client,
  Events,
} = require("discord.js");
const path = require("node:path");
const dotenv = require("dotenv");
const fs = require("node:fs");

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.Guilds,
  ],
  partials: [
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.Channel,
    Partials.Message,
    Partials.User,
  ],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[警告] ${filePath} のコマンドには、必要な「データ」または「実行」プロパティがありません。`
    );
  }
}

client.once(Events.ClientReady, () => {
  console.log("起動完了");
});

client.on(Events.ClientReady, () => {
  setInterval(() => {
    client.user.setActivity(`きりたんぽっぽー: ${client.ws.ping}ms`);
  }, 5000);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "コマンドの実行中にエラーが発生しました",
      ephemeral: true,
    });
  }
});

client.login(process.env.token);
