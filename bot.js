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
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Automatic loading of commands in ./events folder
const eventFiles = fs.readdirSync('./events')
    .filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Run the bot
{
	const loginPromise = client.login(process.env.TOKEN);
	loginPromise.catch((error) => { console.error("Bot failed to login : \n", error) });
}
