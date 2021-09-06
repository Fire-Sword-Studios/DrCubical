const {SlashCommandBuilder, userMention,
  channelMention} = require('@discordjs/builders');

// Example of a command using subcommands
module.exports = {
  data: new SlashCommandBuilder()
      .setName('permissions')
      .setDescription('Get or edit permissions for a user or a role')
      // Using subcommands or subcommand groups will make
      // your base command unusable.
      // Even if it's not documented in the API, a command can mix both subcommands and groups
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
    const group = interaction.options.getSubcommandGroup();
    const subcommand = interaction.options.getSubcommand();

    // This code redirects to the correct subcommand, whether you are
    // using subcommand groups, using subcommands directly
    // or mixing both in the same command
    await (group == null ? subcommandgroups[group] :
      subcommands)[subcommand](interaction);
  },
};

// Put your subcommand groups code in there
const subcommandgroups = {

  user: {
    get: async (interaction) => {
      const user = interaction.options.getUser('user');
      // channel is optionnal, getChannel will either return a channel or null
      const channel = interaction.options.getChannel('channel');
      await interaction.reply(`[get user permissions for 
${userMention(user.id)} ${channel?channelMention(channel.id):''}]`);
    },

    edit: async (interaction) => {
      await interaction.reply(`[edit user permissions]`);
    }
  },

  role: {
    get: async (interaction) => {
      await interaction.reply(`[get role permissions`);
    },

    edit: async (interaction) => {
      await interaction.reply(`[edit role permissions]`);
    }
  }
}

// Put them in there if you use direct subcommands
const subcommands = {
}
