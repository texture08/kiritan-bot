const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("サーバーの情報を表示します。"),
  async execute(interaction) {
    const embed = {
      title: "サーバー情報",
      color: 7506394,
      fields: [
        {
          name: "サーバー名",
          value: interaction.guild.name,
        },
        {
          name: "メンバー数",
          value: interaction.guild.memberCount,
        },
        {
          name: "サーバーID",
          value: interaction.guild.id,
        },
      ],
    };
    await interaction.reply({ embeds: [embed] });
  },
};
