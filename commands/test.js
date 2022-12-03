const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("テストコマンドです。"),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setColor(7506394)
      .setAuthor({
        name: interaction.guild.name,
      })
      .setThumbnail(interaction.guild.iconURL())
      .addFields(
        { name: "Member", value: `${interaction.guild.memberCount}` },
        { name: "ID", value: `${interaction.guild.id}` }
      )
      .setTimestamp()
      .setFooter({
        icon_url: interaction.user.avatarURL(),
        text: "©️ きりたん | Made By Syu",
      });
    //await interaction.reply(`${interaction.guild.iconURL((option = "PNG"))}`);
    // await interaction.guild.channels.cache
    //   .get("1048143100855468082")
    //   .send("test");
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
