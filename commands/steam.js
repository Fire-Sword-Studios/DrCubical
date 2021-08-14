const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('steam')
      .setDescription('Post the steampage link of the game'),
  async execute(interaction) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Steam page')
                .setStyle('LINK')
                .setURL(`https://store.steampowered.com/app/1197260/The_Perfect_Tower_II/`),
        );
    await interaction.reply({
      content: 'Steam page',
      components: [row],
      ephemeral: true,
    });
  },
};
