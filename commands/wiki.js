const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('wiki')
      .setDescription('Post the wiki link')
      .addStringOption((option) =>
        option.setName('search')
            .setDescription('Search a term in the wiki')),
  async execute(interaction) {
    const search = interaction.options.getString('search');
    const content = `https://www.perfecttower2.com/wiki` + (search?`/index.php?search=${search}`:``);

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('The Perfect Tower II Wiki')
                .setStyle('LINK')
                .setURL(content),
        );
    await interaction.reply({
      content: 'The Perfect Tower II Wiki',
      components: [row],
      ephemeral: true,
    });
  },
};
