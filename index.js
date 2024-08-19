require("dotenv").config()

const express = require("express");
const app = express();

const port = process.env.PORT;
app.listen(port , ()=>console.log(`Server is running on port ${port} `))

app.use(express.json())

//Get request
app.get("/" , (req, res) => {
    res.status(200).json({"msg" : "Get Request"})
} )


//Post request
app.post("/" , (req, res) => {
    res.status(201).json({"msg" : "Post Request"})
    console.log(req.body)
} )