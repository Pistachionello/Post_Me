require('dotenv').config();
const express = require("express");
const server = express();

//Allow server use JSON format
server.use(express.json());

//Configure default route for testing
server.get("/", (req, res) => {
    res.send("You are on server!");
})

//Routes binding to server
server.use("/api/visitor", require('./routes/visitor-routes'));
server.use("/api/user", require('./routes/user-routes'));
server.use("/api/auth", require('./routes/auth-routes'));

//Define port variable
const port = process.env.SERVER_STARTING_PORT || 3000;

//Instruct server to listen for connections on that port
server.listen(port, () => {
    console.log(`\n Server is running on port: ${port} \n`);
})