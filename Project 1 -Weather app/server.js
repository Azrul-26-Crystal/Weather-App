const express = require("express")
const path = require("path")
const { router } = require("./routers")
const {PORT} = require("./config/secrets")

const app = express()
app.use(express.json())

app.set("view engine","ejs")
app.set("views", path.resolve(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))

app.use("/",router)

app.listen(PORT,()=>{
        console.log(`Listening to ${PORT}`)
})