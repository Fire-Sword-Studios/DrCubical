const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

// Example of a command that replies using an embed
module.exports = {
  data: new SlashCommandBuilder()
      .setName('embed-ping')
      .setDescription('Replies with "Pong!" in an embed'),

  async execute(interaction) {
    // Creating the embed
    const embed = new MessageEmbed()
      .setDescription('Pong!')
    // .setColor() sets the color of the vertical bar to the left
      .setColor(colors.SUCCESS);

    interaction.reply({embeds: [embed], ephemeral: true});
  },
};
