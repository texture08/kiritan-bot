const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("ユーザー情報を表示します。\n```/user user:<ユーザー>```")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("情報を表示するユーザーを指定")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    let username = `${user.username}#${user.discriminator}`;
    if (user.bot == true) {
      username += ` BOT`;
    }
    const embed = {
      author: {
        name: username,
        icon_url: user.avatarURL(),
      },
      color: 7506394,
      fields: [
        {
          name: "ID",
          value: user.id,
        },
      ],
    };
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
