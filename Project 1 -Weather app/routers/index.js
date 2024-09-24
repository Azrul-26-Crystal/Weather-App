const { Router } = require("express");
const { indexRoute } = require("../controllers");
const { searchRoute } = require("../controllers");

const router = Router()

router.route("/").get(indexRoute)
router.route("/forecast").get(searchRoute)
module.exports = {router}