require('dotenv').config();
const path = require("path")
const express = require("express");
const server = express();

//Allow server use JSON format
server.use(express.json());

//Routes binding to server
server.use("/api/visitor", require('./routes/visitor-routes'));
server.use("/api/user", require('./routes/user-routes'));
server.use("/api/auth", require('./routes/auth-routes'));

if (process.env.NODE_ENV === "production") {
    server.use("/", express.static(path.join(__dirname, "client", "build")));

    server.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

//Define port variable
const port = process.env.PORT || 4000;

//Instruct server to listen for connections on that port
server.listen(port, () => {
    console.log(`\n Server is running on port: ${port} \n`);
})