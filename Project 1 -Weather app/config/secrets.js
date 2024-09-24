const dotEnv = require("dotenv")
const path = require("path")

const config = dotEnv.config({ path : path.resolve(__dirname,"../.env")})

module.exports={ ...process.env}