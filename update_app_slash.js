const dotenv = require('dotenv');
const fs = require('fs');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

dotenv.config();

/**
 * Maps a permission.type value to the corresponding int value
 * @param {str | int} type permission overwrite type
 * @return {int} the mapped value for permission overwrite type
 */
function resolveType(type) {
  switch (type) {
    case 1: case 'ROLE':
      return 1;
    case 2: case 'USER':
      return 2;
    default:
      throw new Error('Unknown permission overwrite type');
  }
}


// Fetch commands from ./commands folder
const commands = [];
const permissionsOverwrites = {};
const commandFiles = fs.readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  const data = command.data.toJSON();

  // Check for default permission
  if (command.default_permission !== undefined) {
    data.default_permission = command.default_permission;
  }
  commands.push(data);

  // Check for permission overwrites
  if (command.permissions && command.permissions.length > 0) {
    const permissions = command.permissions;
    permissions.map((permission) =>
      permission.type = resolveType(permission.type));
    permissionsOverwrites[data.name] = permissions;
  }
}

// Make the requests to update app commands
const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    // Update guild slash commands
    await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID,
            process.env.GUILD_ID),
        {body: commands},
    );

    // Get all slash commands informations
    const appCommands = await rest.get(
        Routes.applicationGuildCommands(process.env.CLIENT_ID,
            process.env.GUILD_ID),
    );

    // Get overwrite informations from commands
    const overwrites = [];
    for (const command of appCommands) {
      if (permissionsOverwrites[command.name]) {
        overwrites.push({
          id: command.id,
          permissions: permissionsOverwrites[command.name],
        });
      }
    }

    console.log('Started refreshing application (/) commands permissions.');
    // Update permissions for slash commands
    await rest.put(
        Routes.guildApplicationCommandsPermissions(process.env.CLIENT_ID,
            process.env.GUILD_ID),
        {body: overwrites},
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
