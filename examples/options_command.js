const {SlashCommandBuilder} = require('@discordjs/builders');

// Example of a command using optionnal parameters
module.exports = {
  data: new SlashCommandBuilder()
      .setName('animal')
      .setDescription('Search an animal gif')
      // you can add options, max 25
      // each option must have a name and a description
      .addStringOption((option) =>
        option.setName('animal')
            .setDescription('animal to search')
            /* default value for required is false
              true will force the user to fill this parameter */
            .setRequired(true)
            /* If you specify choices with addChoice(),
              they'll be the **ONLY** valid values the user can pick */
            .addChoice('Cat', 'animal_cat')
            .addChoice('Dog', 'animal_dog')
            .addChoice('Bunny', 'animal_bunny')),

  /* Valid option types are
        string, integer, number (float), boolean,
        user, channel, role, mentionnable
        */

  async execute(interaction) {
    await interaction.reply('Imagine a gif');
  },
};
