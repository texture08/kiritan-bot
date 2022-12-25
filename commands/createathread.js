const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createathread")
    .setDescription(
      "スレッドを作成するコマンドです。```/createaThread name<名前>```"
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("スレッドの名前を指定")
        .setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const thread = await interaction.channel.threads.create({
      name: name,
      autoArchiveDuration: 60,
    });
    interaction.reply({
      content: `${thread.name}が立ちました。`,
      ephemeral: true,
    });
  },
};