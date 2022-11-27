const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("テストコマンドです。"),
  async execute(interaction) {
    await interaction.reply(`${interaction.guild.iconURL((option = "PNG"))}`);
  },
};
