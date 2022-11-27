const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("ユーザー情報を表示します。\n`/user user<ユーザー>`")
    .addUserOption((option) =>
      option.setName("user").setDescription("情報を表示するユーザーを指定")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const embed = {
      title: "ユーザー情報",
      color: 7506394,
      fields: [
        {
          name: "ユーザー名",
          value: user.username,
        },
        {
          name: "ユーザーID",
          value: user.id,
        },
      ],
    };
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
