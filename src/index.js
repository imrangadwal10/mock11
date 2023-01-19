const express = require("express");
const connect=require("./config/connect")
const cors = require("cors");
const app = express();
const PORT = 5005;


const userRoute = require("./user/user.route")

app.use(cors());
app.use(express.json())




app.use('/user', userRoute)

app.get("/", (req, res) => {
    res.status(200).send("hello World")
})



app.listen(PORT, async () => {
    await connect()
    console.log(`server started on port ${PORT}`)
})