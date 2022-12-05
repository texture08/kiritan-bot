const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("テストコマンドです。"),
  async execute(interaction) {
    await interaction.reply({ files: ["./syu.png"] });
  },
};
