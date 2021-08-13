const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('steam')
      .setDescription('Post the steampage link of the game'),
  async execute(interaction) {
    await interaction.reply({
      content: `https://store.steampowered.com/app/1197260/The_Perfect_Tower_II/`,
      ephemeral: true,
    });
  },
};
