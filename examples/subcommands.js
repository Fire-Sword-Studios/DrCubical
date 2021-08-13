const {SlashCommandBuilder} = require('@discordjs/builders');

// Example of a command using subcommands
module.exports = {
  data: new SlashCommandBuilder()
      .setName('permissions')
      .setDescription('Get or edit permissions for a user or a role')
      // Using subcommands or subcommand groups will make
      // your base command unusable.
      // A command can have EITHER subcommands or groups, not both
      // Subcommand groups can only have subcommands, not groups
      // If you need more details, feel free to check the documentation
      // https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups
      .addSubcommandGroup((group) =>
        group.setName('user')
            .setDescription('Get or edit permissions for a user')
            .addSubcommand((subcommand) =>
              subcommand.setName('get')
                  .setDescription('Get permissions for a user')
                  .addUserOption((option)=>
                    option.setName('user')
                        .setDescription('The user to get')
                        .setRequired(true))
                  .addChannelOption((option) =>
                    option.setName('channel')
                        .setDescription(`The channel permissions to get. 
If omitted, the guild permissions will be returned`)
                        .setRequired(false)))
            .addSubcommand((subcommand) =>
              subcommand.setName('edit')
                  .setDescription('Edit permissions for a user')))
      .addSubcommandGroup((group) =>
        group.setName('role')
            .setDescription('Get or edit permissions for a role')
            .addSubcommand((subcommand) =>
              subcommand.setName('get')
                  .setDescription('Get permissions for a role'))
            .addSubcommand((subcommand) =>
              subcommand.setName('edit')
                  .setDescription('Edit permissions for a role'))),
  // To add subcommands without groups, you can just use .addSubCommand()

  async execute(interaction) {
    await interaction.reply('Imagine you can manage permissions');
  },
};
