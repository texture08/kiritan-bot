const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("サーバーの情報を表示します。"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(7506394)
      .setAuthor({
        name: interaction.guild.name,
      })
      .setThumbnail(interaction.guild.iconURL())
      .addFields(
        {
          name: "Members",
          value: `${
            interaction.guild.members.cache.filter((m) => !m.user.bot).size
          }`,
          inline: true,
        },
        {
          name: "BOT",
          value: `${
            interaction.guild.members.cache.filter((m) => m.user.bot).size
          }`,
          inline: true,
        },
        { name: "ID", value: `${interaction.guild.id}` }
      )
      .setTimestamp()
      .setFooter({
        icon_url: interaction.user.avatarURL(),
        text: "©️ きりたん | Made by Syu",
      });
    await interaction.reply({ embeds: [embed] });
  },
};
