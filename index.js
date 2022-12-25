const {
  GatewayIntentBits,
  AuditLogEvent,
  EmbedBuilder,
  Collection,
  Partials,
  Client,
  Events,
} = require("discord.js");
const path = require("node:path");
const dotenv = require("dotenv");
const fs = require("node:fs");

dotenv.config();
config = process.env;

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

client.on(Events.MessageDelete, async (message) => {
  if (!message.guild) return;
  try {
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MessageDelete,
    });

    const deletionLog = fetchedLogs.entries.first();

    if (!deletionLog)
      return console.log(
        `${message.author.tag} によるメッセージは削除されましたが、関連する監査ログは見つかりませんでした。`
      );

    const { executor, target } = deletionLog;

    // let embed = new EmbedBuilder()
    //   .setColor(7506394)
    //   .setAuthor({
    //     name: message.author.tag,
    //     iconURL: message.author.avatarURL(),
    //   })
    //   .addFields({ name: "Message", vaule: message.content });

    if (target.id === message.author.id) {
      console.log(
        `${message.author.tag} のメッセージが ${executor.tag} によって削除されました。\n${message.content}`
      );
      // embed.setFooter({
      //   text: `${executor.tag}によって削除されました。`,
      //   iconURL: executor.avatarURL(),
      // });
    } else {
      console.log(
        `${message.author.tag} のメッセージが削除されましたが。自分、または削除した人が不明です。\n${message.content}`
      );
      // embed.setFooter({
      //   text: `自分で削除された又は、削除した人が不明です`,
      // });
    }
    //message.guild.channels.cache.get("1048143100855468082").send("test");
    // message.guild.channels.cache
    //   .get(config.systemch)
    //   .send({ embeds: [embed] });
  } catch (error) {
    console.log(`エラーが発生しました\n${error}`);
    // message.guild.channels.cache
    //   .get(config.systemch)
    //   .send(`削除されメッセージが取得できませんでした\n${error}`);
  }
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

client.login(config.token);
