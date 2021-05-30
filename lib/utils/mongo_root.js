
const mongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_HOST;
const dataBase = process.env.DB_NAME;

const client = new mongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

const connect = async (dbName = dataBase) => {
  const conn = await client.connect();
  console.log('<===== Database connected =====>')
  db = conn.db(dbName);
  return client;
}

const getDbRef = () => {
  return db ? db : new Error('Connection error');
}

module.exports.connect = connect;
module.exports.db = getDbRef;
