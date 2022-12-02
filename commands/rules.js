const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("ルールを表示します"),
  async execute(interaction) {
    const embed = {
      title: "以下ルールになります。必ず守りましょう",
      color: 7506394,
      fields: [
        {
          name: "発言について",
          value: `基本的に自由に発言してもらって構いません
          下ネタ、暴言、他人を不快にするような発言は控えてください`,
        },
        {
          name: "年齢について",
          value: `Discordの規約上、13歳未満の参加は禁止されているため
          該当者は速やかに退出をお願いします
          13歳未満だと発覚した場合は管理者からキック又はBANされることがあります`,
        },
        {
          name: "メンションについて",
          value: `特に規制はしませんが、できる限りしないように心がけてくれると嬉しい限りです
          また、返信機能のメンションは必要でなければ原則切るようにお願いいたします
          everyoneなどの全ユーザーへのメンションは禁止しています`,
        },
        {
          name: "URLについて",
          value: `自由にはってくれて結構ですが
          埋め込みが長すぎる、なんども同じリンクをはるなどは荒らし行為とします`,
        },
        {
          name: "ファイルの添付について",
          value: `\`\`zip\`\` \`\`exe\`\` \`\`bat\`\`等の拡張子は原則禁止です
          \`\`png\`\` \`\`jpeg\`\`などの画像形式、\`\`mp4\`\`などの動画形式、\`\`mp3\`\` \`\`wav\`\`などの音声形式は大丈夫です
          また、\`\`js\`\` \`\`py\`\` \`\`html\`\` \`\`json\`\`などの拡張子も許可しています（プログラミングチャンネルにてお願いします）`,
        },
        {
          name: "引用について",
          value: `必要であればURLなどはってください`,
        },
        {
          name: "宣伝について",
          value: `宣伝チャンネルをご活用ください。メンションは禁止です`,
        },
        {
          name: "botについて",
          value: `常識の範囲内でご自由にお使いください`,
        },
        {
          name: "ロールについて",
          value: `メンションかDMにて申請すれば可能な限り上げます`,
        },
        {
          name: "招待リンク",
          value: `以下をお使いください
          https://discord.gg/vNp3cjy4Eq`,
        },
      ],
    };
    await interaction.reply({
      content: "コマンドを実行しました。\nこのメッセージは削除してください",
      ephemeral: true,
    });
    await interaction.channel.send({ embeds: [embed] });
  },
};
