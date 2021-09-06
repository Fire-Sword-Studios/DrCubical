const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const assert = require('assert')
const {colors} = require('../core/colors.js');
const {DBClient} = require('../core/database.js');

// Example of a command that interacts with the database
module.exports = {
  data: new SlashCommandBuilder()
      .setName('database')
      .setDescription('Interact with a testing database')
      .addSubcommand(subcommand => subcommand
        .setName('insert')
        .setDescription('Add an entry to the database')
        .addStringOption(option => option.setName('title').setDescription("This entry's title").setRequired(true))
        .addStringOption(option => option.setName('entry').setDescription("The content of this entry").setRequired(true))
      )
      .addSubcommand(subcommand => subcommand
        .setName('count')
        .setDescription('Replies with the number of entries in the database.')
      ),
  // TODO: Add more commands for listing entries, fetching the content of an entry, deleting an entry, etc.

  async execute(interaction) {
    await subcommands[interaction.options.getSubcommand()](interaction);
  },
};

const subcommands = {

  add: async (interaction) => {
    try {
      // The database we use will probably be the same for all commands,
      // we might add the prod database name to the database.js exports
      const db = DBClient.db('dev_test');
      // All operation you do need to be made on a collection, if the collection
      // doesn't exist, it'll be created automatically
      const collection = db.collection('example');
      // MongoDB works with "documents", which are basically json objects
      await collection.insertOne({title: interaction.options.getString('title'), value: interaction.options.getString('entry')});
      interaction.reply({embeds: [new MessageEmbed().setDescription('Successfully inserted new entry!').setColor(colors.SUCCESS)], ephemeral: true});
    } catch (err) {
      interaction.reply({embeds: [new MessageEmbed().setDescription('Command failed').setColor(colors.FAILURE)], ephemeral: true});
      console.error(err);
    }
  },

  count: async (interaction) => {
    try {
      const db = DBClient.db('dev_test');
      const collection = db.collection('example');
      let count = 0, reply = '-', docs;
      // This counts all documents in a collection, might be a
      // long operation if the collection is too large
      count = await collection.count({}, {});
      reply = '' + count;
      interaction.reply({embeds: [new MessageEmbed().setDescription(reply).setColor(colors.SUCCESS)], ephemeral: false});
    } catch (err) {
      interaction.reply({embeds: [new MessageEmbed().setDescription('Command failed').setColor(colors.FAILURE)], ephemeral: true});
      console.error(err);
    }
  },
};
