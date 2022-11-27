const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("コマンドのヘルプを表示します"),
  async execute(interaction) {
    let str;

    let embed = {
      title: "コマンドのヘルプです",
      color: 7506394,
      fields: [],
    };

    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      //str += `Name: ${command.data.name}, Description: ${command.data.description} \n`;
      str = {
        name: command.data.name,
        value: command.data.description,
      };
      embed["fields"].push(str);
    }

    return interaction.reply({ embeds: [embed] });
  },
};
