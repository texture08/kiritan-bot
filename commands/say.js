const { SlashCommandBuilder } = require("discord.js");

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

    const embed = {
      title: "say log",
      color: 7506394,
      fields: [
        {
          name: "ユーザー名",
          value: user.username,
        },
        {
          name: "内容",
          value: message,
        },
      ],
    };

    await interaction.reply({
      content: "コマンドを実行しました。\nこのメッセージは削除してください",
      ephemeral: true,
    });
    await interaction.channel.send(message);
    if (user.id != "634941376840073217" && user.id != "1048115843243982909") {
      await interaction.guild.channels.cache
        .get("1048143100855468082")
        .send({ embeds: [embed] });
    }
  },
};
