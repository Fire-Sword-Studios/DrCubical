module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    const customId = interaction?.customId;
    if (!customId) {
      return;
    }

    const voteType = customId.startsWith('upvote') ?
    'up':(customId.startsWith('downvote') ?
    'down':null);

    // Not a vote interaction
    if (!voteType) {
      return;
    }

    // TODO: Test if user already voted

    const suggestionNumber = customId.split('-')[1];

    await interaction.reply({
      content: `${voteType}vote enregistré pour la suggestion 
${suggestionNumber}`,
      ephemeral: true,
    });
  },
};
