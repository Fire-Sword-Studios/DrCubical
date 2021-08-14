const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('trello')
      .setDescription('Post the roadmap & bugs trello link'),
  async execute(interaction) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Bug tracker & Roadmap')
                .setStyle('LINK')
                .setURL(`https://trello.com/b/obubOJAZ`),
        );
    await interaction.reply({
      content: 'Bug tracker & Roadmap',
      components: [row],
      ephemeral: true,
    });
  },
};
