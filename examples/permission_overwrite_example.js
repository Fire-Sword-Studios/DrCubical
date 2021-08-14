const {SlashCommandBuilder} = require('@discordjs/builders');

// Example of permission overwrite
module.exports = {
  data: new SlashCommandBuilder()
      .setName('adminping')
      .setDescription('Replies with Pong!'),
  // Set if all members of the guild should be able to use that command
  default_permission: false,
  // Overwrite permissions by specifying ROLE or USER ids
  // There can be only TEN (10) overwrites per command
  // Overwrites also affect subgroups and subcommands
  permissions: [
    {
      id: '123456789012345678',
      type: 'USER',
      permission: true,
    },
  ],
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
