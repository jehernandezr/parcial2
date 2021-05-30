const { db } = require("../lib/utils/mongo_root");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JSON_TOKEN;
const COLLECTION_NAME = "users";

async function createUser(user) {
  const { password } = user;
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  return await db().collection(COLLECTION_NAME).insertOne(user);
}
async function getUserByEmail(email) {
  const user = await db().collection(COLLECTION_NAME).findOne({ email: email });
  return user;
}

async function getUserByUserName(username) {
  const user = await db().collection(COLLECTION_NAME).findOne({ username });
  return user;
}

async function login(user) {
  const { username, password } = user;

  if (username && password) {
    try {
      const currentUser = await getUserByUserName(username);
      console.log("currentUser", currentUser);
      if (!currentUser) {
        return {
          success: false,
          msg: "Incorrect username and/or password",
        };
      }
      const validation = bcryptjs.compareSync(password, currentUser.password);
      if (validation) {
        let token = jwt.sign({ username, email: currentUser.email }, jwtKey, {
          expiresIn: "24h",
        });

        return {
          success: true,
          msg: "Logged successfully",
          token,
          data: {
            username: currentUser.username,
            email: currentUser.email,
            roles: currentUser.roles,
          },
        };
      } else {
        return {
          success: false,
          msg: "Incorrect username and/or password",
        };
      }
    } catch (error) {
      return {
        success: false,
        msg: "Internal error",
      };
    }
  } else {
    return {
      success: false,
      msg: "Incorrect username and/or password",
    };
  }
}

module.exports = [createUser, getUserByEmail, login];
