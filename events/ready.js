module.exports = {
  name: 'ready',
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`<@${client.user.id}>`);
    client.suggestionCount = 1;
  },
};
