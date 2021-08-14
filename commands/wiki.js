const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('wiki')
      .setDescription('Post the wiki link')
      .addStringOption((option) =>
        option.setName('search')
            .setDescription('Search a term in the wiki')),
  async execute(interaction) {
    const search = interaction.options.getString('search');
    const content = `The Perfect Tower II Wiki
<https://www.perfecttower2.com/wiki` + (search?`/index.php?search=${search}`:``) + `>`;
    await interaction.reply({
      content: content,
      ephemeral: true,
    });
  },
};
