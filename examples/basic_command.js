const {SlashCommandBuilder} = require('@discordjs/builders');

// Example of a basic command builder
module.exports = {
  // Here you change your command name and description based on its behaviour
  data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!'),
  // And here you define the behavior when called.
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
