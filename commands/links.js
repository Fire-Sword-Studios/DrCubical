const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('links')
      .setDescription('Displays useful links'),
  async execute(interaction) {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Useful links')
        .setDescription(`Steam page: [steampowered.com](https://store.steampowered.com/app/1197260/The_Perfect_Tower_II/)
Bug tracker & Roadmap: [trello.com](https://trello.com/b/obubOJAZ)
The Perfect Tower II Wiki: [perfecttower2.com](https://www.perfecttower2.com/wiki)
Server invite: [discord.gg/fireswordstudios](https://discord.gg/fireswordstudios)

Play the web version on [The Perfect Tower II](https://games.fs-studios.com/games/perfecttower2)

Social medias:
Reddit: [r/PerfectTower](https://www.reddit.com/r/PerfectTower/)
Facebook: [@fireswordstudios](https://www.facebook.com/fireswordstudios)
Twitter: [@FireSwordStudio](https://twitter.com/fireswordstudio)
Twitch: [FireSwordStudios](https://www.twitch.tv/fireswordstudios)
Youtube: [Fire Sword Studios](https://www.youtube.com/channel/UCDV-wwiAAic-OESAayfUz_Q)`);
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Steam page')
                .setStyle('LINK')
                .setURL('https://store.steampowered.com/app/1197260/The_Perfect_Tower_II/'),
        ).addComponents(
            new MessageButton()
                .setLabel('Bug tracker & Roadmap')
                .setStyle('LINK')
                .setURL('https://trello.com/b/obubOJAZ'),
        ).addComponents(
            new MessageButton()
                .setLabel('The Perfect Tower II Wiki')
                .setStyle('LINK')
                .setURL('https://www.perfecttower2.com/wiki'),
        );
    const socialMedias = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Reddit')
                .setStyle('LINK')
                .setURL('https://www.reddit.com/r/PerfectTower/'),
        ).addComponents(
            new MessageButton()
                .setLabel('Facebook')
                .setStyle('LINK')
                .setURL('https://www.facebook.com/fireswordstudios'),
        ).addComponents(
            new MessageButton()
                .setLabel('Twitter')
                .setStyle('LINK')
                .setURL('https://twitter.com/fireswordstudio'),
        ).addComponents(
            new MessageButton()
                .setLabel('Twitch')
                .setStyle('LINK')
                .setURL('https://www.twitch.tv/fireswordstudios'),
        ).addComponents(
            new MessageButton()
                .setLabel('Youtube')
                .setStyle('LINK')
                .setURL('https://www.youtube.com/channel/UCDV-wwiAAic-OESAayfUz_Q'),
        );

    await interaction.reply({
      embeds: [embed],
      components: [row, socialMedias],
      ephemeral: false});
  },
};
