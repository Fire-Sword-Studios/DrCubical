const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
      .setName('suggestion')
      .setDescription('Process a suggestion')

      .addSubcommand((subcommand) =>
        subcommand.setName('approve')
            .setDescription(`Approves of a suggestion. \
If reason is left blank the reason will be "No reason given"`)
            .addIntegerOption((option) =>
              option.setName('suggestion_number')
                  .setDescription('The suggestion number to process')
                  .setRequired(true))
            .addStringOption((option) =>
              option.setName('reason')
                  .setDescription('Reason to process')
                  .setRequired(false)))
      .addSubcommand((subcommand) =>
        subcommand.setName('deny')
            .setDescription(`Approves of a suggestion. \
If reason is left blank the reason will be "No reason given"`)
            .addIntegerOption((option) =>
              option.setName('suggestion_number')
                  .setDescription('The suggestion number to process')
                  .setRequired(true))
            .addStringOption((option) =>
              option.setName('reason')
                  .setDescription('Reason to process')
                  .setRequired(false)))
      .addSubcommand((subcommand) =>
        subcommand.setName('consider')
            .setDescription(`Approves of a suggestion. \
If reason is left blank the reason will be "No reason given"`)
            .addIntegerOption((option) =>
              option.setName('suggestion_number')
                  .setDescription('The suggestion number to process')
                  .setRequired(true))
            .addStringOption((option) =>
              option.setName('reason')
                  .setDescription('Reason to process')
                  .setRequired(false)))
      .addSubcommand((subcommand) =>
        subcommand.setName('implemented')
            .setDescription(`Approves of a suggestion. \
If reason is left blank the reason will be "No reason given"`)
            .addIntegerOption((option) =>
              option.setName('suggestion_number')
                  .setDescription('The suggestion number to process')
                  .setRequired(true))
            .addStringOption((option) =>
              option.setName('reason')
                  .setDescription('Reason to process')
                  .setRequired(false))),

  default_permissions: false,
  permissions: [
    {
      id: process.env.ADMIN_ROLE,
      type: 'ROLE',
      permission: true,
    },
  ],
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const suggestionNumber = interaction.options
        .getInteger('suggestion_number');
    const reason = interaction.options
        .getString('reason') || 'No reason given';

    const suggestionChannel = await interaction.client.channels
        .fetch(process.env.SUGGESTION_CHANNEL);
    const processedSuggestionChannel = await interaction.client.channels
        .fetch(process.env.PROCESSED_SUGGESTION_CHANNEL);

    const suggestionMessage = await suggestionChannel.messages.fetch(
        database.getSuggestionLink(suggestionNumber),
    );
    const suggestionAuthor = suggestionMessage.author;

    const embed = new MessageEmbed()
        .setAuthor(suggestionMessage.author.name,
            suggestionMessage.author.iconURL)
        .setDescription(suggestionMessage.embeds[0].description + `
**Reason from ${interaction.user.tag}**
${reason}`);
    switch (subcommand) {
      case 'approve':
        embed.setColor('#bae6a5')
            .setTitle(`Suggestion #${suggestionNumber} Approved`);
        break;
      case 'deny':
        embed.setColor('#ff7770')
            .setTitle(`Suggestion #${suggestionNumber} Denied`);
        break;
      case 'consider':
        embed.setColor('#fff4a3')
            .setTitle(`Suggestion #${suggestionNumber} Considered`);
        break;
      case 'implemented':
        embed.setColor('#a3ffea')
            .setTitle(`Suggestion #${suggestionNumber} Implemented`);
        break;
    }
    // Move the suggestion
    await processedSuggestionChannel.send({
      embeds: [embed],
    });
    suggestionMessage.delete()
        .catch(console.error);

    // Send confirmation message to suggestion's author
    suggestionAuthor.createDM().then((channel) =>
      channel.send({
        content: `Hello, a suggestion that was made by you has \
been implemented by ${interaction.user.tag} with the reason: ${reason}`,
        embeds: [embed],
      }));
  },
};
