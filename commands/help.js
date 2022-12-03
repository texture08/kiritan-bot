const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("コマンドのヘルプを表示します"),
  async execute(interaction) {
    let str;

    let embed = {
      author: {
        name: "きりたん",
        icon_url: interaction.user.avatarURL(),
      },
      title: "コマンドのヘルプです",
      color: 7506394,
      timestamp: new Date(),
      footer: {
        icon_url: interaction.user.avatarURL(),
        text: "©️ きりたん | Made by Syu",
      },
      fields: [],
    };

    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      str = {
        name: `/${command.data.name}`,
        value: command.data.description,
      };

      if (
        command.data.name != "help" &&
        command.data.name != "rules" &&
        command.data.name != "test"
      ) {
        embed["fields"].push(str);
      }
    }

    await interaction.reply({ embeds: [embed] });
  },
};
