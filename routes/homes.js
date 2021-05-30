var express = require("express");
var router = express.Router();
var jwtValidator = require("../middlewares/jwt-validator");
var [getHomes, getHomeById] = require("../controllers/home");

/* GET homes listing. */
router.get("/", async function (req, res, next) {
  const homes = await getHomes();
  res.send(homes);
});
/* GET home by ID */
router.get("/:id", async function (req, res, next) {
  const home = await getHomeById(req.params.id);
  res.send(home);
});

module.exports = router;
