const express = require('express')
const userRouter = require("./routes/route")

const app = express()
app.use(express.json())
app.use('/', userRouter)


app.listen(3000, () => {
    console.log("Listening on...3000");
})