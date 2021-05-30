const { db } = require("../lib/utils/mongo_root");
const COLLECTION_NAME = "rooms";

async function getRoomsByHome(id) {
  const rooms = await db()
    .collection(COLLECTION_NAME)
    .find({ homeId: id })
    .toArray();
  return rooms;
}

/* async function getOneById(id) {
    const product = await db().collection(COLLECTION_NAME)
      .findOne({id: id})
    return product;
} */

/* async function insertProduct(product) {
  await db().collection(COLLECTION_NAME)
    .insertOne(product)
  return;
}

async function getOneById(id) {
  const product = await db().collection(COLLECTION_NAME)
    .findOne({id: id})
  return product;
} */

module.exports = [getRoomsByHome];
