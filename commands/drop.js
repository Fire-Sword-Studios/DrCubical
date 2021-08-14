const {MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('drop')
      .setDescription('Help message for drop chances'),
  async execute(interaction) {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Module Dropchances')
        .setDescription(`The new module chances work like this:
**Example: Forest**
- Fire Attack - 5%
- Earth Attack - 5%
- Nature Attack - 5%
- Fire Burst - 2%
- Earth Burst - 2%
- Nature Burst - 2%
- Fire Resistance - 5%
- Earth Resistance - 5%
- Nature Resistance - 5%

When exiting the round (either by quitting manually, fulfilling the victory \
condition or dying) it checks each chance individually multiplied by any \
bonuses from town (like the workshop skill), a specific factor based on \
the difficulty and multiplied by a factor based on your wave progress.

The current difficulty factor for each difficulty is:
- Easy x1
- Medium x1.5
- Hard x1.5
- Insane x2
- Nightmare x2.25
- Impossible x2.5

and the formula for the wave bonus is \`Log10(currentWave / 10)\`

So if you are in forest with the workshop skill on medium difficulty at \
wave 167 you would have a
\`5% * 2 * 1.5 * Log10(currentWave / 10) = ~18.3%\` chance to unlock Fire Attack
Since this can trigger for each module individually you could potentially \
unlock all modules in a single long run.
Same scenario at wave 98750 would yield a ~59.9% chance

**Formula**: \`drop_chance * difficulty_factor * wave_bonus * skills\``);
    await interaction.reply({embeds: [embed], ephemeral: true});
  },
};
