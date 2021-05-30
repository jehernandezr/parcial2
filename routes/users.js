var express = require("express");
var router = express.Router();
var [createUser, getUserByEmail, login] = require("../controllers/user");

/**
 * POST create user
 */
router.post("/", async function (req, res, next) {
  try {
    const { username, password, roles, email } = req.body;
    const existUser = await getUserByEmail(email);

    if (!existUser) {
      await createUser(req.body);
      res.status(201).send({
        success: true,
        data: {
          username,
          email,
        },
      });
    } else {
      res
        .status(412)
        .send({ success: false, msg: "Email is already registered" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Internal Error" });
  }
});

/**
 * Login
 */
router.post("/login", async function (req, res, next) {
  console.log(req.body);
  const response = await login(req.body);
  if (response.success) {
    res.cookie("token", response.token, { httpOnly: true });
    res.status(200).send(response);
  } else {
    res.status(401).send(response);
  }
});

module.exports = router;
