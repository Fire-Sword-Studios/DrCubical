const {Client, Intents, Collection} = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const client = new Client({
  // TODO: check intents required
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Automatic loading of commands in ./commands folder
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`<@${client.user.id}>`);
});

// Dynamically executing commands
// Code found at https://discordjs.guide/command-handling/#reading-command-files
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (!client.commands.has(interaction.commandName)) return;

  try {
    await client.commands.get(interaction.commandName).execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

// Handler for buttons (see https://discordjs.guide/interactions/buttons.html#receiving-buttons)
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
});

client.on('messageCreate', (msg) => {
  /*
   Nothing should really be here, all commands are expected
   to be application commands (aka interactions)
   */
});

// Run the bot
{
	const loginPromise = client.login(process.env.TOKEN);
	loginPromise.catch((error) => { console.error("Bot failed to login : \n", error) });
}
