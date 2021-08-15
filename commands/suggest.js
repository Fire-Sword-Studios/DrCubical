const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('suggest')
      .setDescription('Suggest an idea or feature for the game.')
      .addStringOption((option) =>
        option.setName('suggestion')
            .setDescription('Your suggestion')
            .setRequired(true)),
  async execute(interaction) {
    // TODO: fetch in database
    const suggestionNumber = interaction.client.suggestionCount++;
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Suggestion ${suggestionNumber}`)
        .setDescription(interaction.options.getString('suggestion'))
        .setAuthor(interaction.user.tag, interaction.user.avatarURL())
        .setFooter(`Votes: 12⬆️ : 3⬇️`);
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`upvote-${suggestionNumber}`)
                .setEmoji('⬆️')
                .setStyle('PRIMARY'),
        ).addComponents(
            new MessageButton()
                .setCustomId(`downvote-${suggestionNumber}`)
                .setEmoji('⬇️')
                .setStyle('PRIMARY'),
        );

    const suggestionChannel = await interaction.client.channels
        .fetch(process.env.SUGGESTION_CHANNEL);

    await interaction.reply({content: 'Suggestion envoyée', ephemeral: true});
    await suggestionChannel.send({
      embeds: [embed],
      components: [row],
    });
  },
};
