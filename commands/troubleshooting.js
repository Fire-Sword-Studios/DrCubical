const {SlashCommandBuilder} = require('@discordjs/builders');
const helpMessages = require('../resources/data/helpMessages');


const choices = Object.keys(helpMessages).map((m) => [m, m]);
console.log(choices);

module.exports = {
  data: new SlashCommandBuilder()
      .setName('troubleshooting')
      .setDescription('Displays helping messages for common issues')
      .addStringOption((option) =>
        option.setName('query')
            .setDescription('Help message to search for')
            .setRequired(true)
            .addChoices(choices),
      )
      .addUserOption((option) =>
        option.setName('target')
            .setDescription('User to mention')
            .setRequired(false),
      ),

  async execute(interaction) {
    const query = interaction.options.getString('query');
    const user = interaction.options.getUser('target');
    const content = user ?
    `Help message suggestion for ${user}`:
    ` `;
    await interaction.reply({
      content: content,
      embeds: [helpMessages[query]?.message],
    });
  },
};
