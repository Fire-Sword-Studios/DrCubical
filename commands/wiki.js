const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('wiki')
      .setDescription('Post the wiki link')
      .addStringOption((option) =>
        option.setName('search')
            .setDescription('Search a term in the wiki')),
  async execute(interaction) {
    await interaction.reply({
      content: `The Perfect Tower II Wiki
https://www.perfecttower2.com/wiki`,
      ephemeral: true,
    });
  },
};
