const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("テストコマンドです。"),
  async execute(interaction) {
    //await interaction.reply(`${interaction.guild.iconURL((option = "PNG"))}`);
    await interaction.guild.channels.cache
      .get("1048143100855468082")
      .send("test");
  },
};
