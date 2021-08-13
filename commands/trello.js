const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('trello')
      .setDescription('Post the roadmap & bugs trello link'),
  async execute(interaction) {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Bug tracker & Roadmap')
        .setURL('https://trello.com/b/obubOJAZ');
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
