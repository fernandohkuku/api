require("dotenv").config()

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const handdle = require("./handlers")
const routes = require("./routes")
const router = require("./routes/crop")
const port = process.env.PORT

const app = express()
app.use(cors())
app.use(bodyParser.json())


app.use('/api/auth', routes.auth)
app.use('/api/crop', routes.crop)
app.use('/api/nutrient', routes.nutrient)
app.use('/api/fertilizer', routes.fertilizer)
app.use('/api/sample', routes.sample)

app.use(handdle.notFound)
app.use(handdle.errorHandler)

app.listen(port, console.log(`server started on port ${port}`))

