const MongoClient = require('mongodb').MongoClient

// Generating the url to connect to the database
const username = encodeURIComponent(process.env.DATABASE_USER);
const password = encodeURIComponent(process.env.DATABASE_PASS);
const ip = process.env.DATABASE_IP;
const port = process.env.DATABASE_PORT;
const uri = `mongodb://${username}:${password}@${ip}:${port}/?authMechanism=DEFAULT`;

// TODO: close connection on process termination

// Creating a new client and connecting it to the database
const client = new MongoClient(uri);
client.connect().then(() => {
  console.error("Database connection established.")
}).catch((error) => {
  console.error("Failed to connect to the database.")
  throw error;
});

// The newly created client will be used for all database operations
module.exports = {
  DBClient: client
}
