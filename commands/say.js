const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription(
      "きりたんに好きな言葉をしゃべらせます。※悪用厳禁\n```/say message:<message>```"
    )
    .addStringOption((options) =>
      options.setName("message").setDescription("言葉").setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("message");
    const user = interaction.user;

    const embed = new EmbedBuilder()
      .setColor(7506394)
      .setAuthor({
        name: "Say LOG",
      })
      .addFields(
        {
          name: "User",
          value: `${user.username}#${user.discriminator}`,
          inline: true,
        },
        {
          name: "ID",
          value: `${user.id}`,
          inline: true,
        },
        { name: "Value", value: message }
      );

    await interaction.reply({
      content: "コマンドを実行しました。\nこのメッセージは削除してください",
      ephemeral: true,
    });
    await interaction.channel.send(message);
    if (user.id != "634941376840073217" && user.id != "1048115843243982909") {
      await interaction.guild.channels.cache
        .get(process.env.systemch)
        .send({ embeds: [embed] });
    }
  },
};
