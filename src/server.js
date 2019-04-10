const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const server = require("http").Server(app);
const io = require("socket.io")(server);

const app = express();
app.use(cors());

io.on("connection", socket => {
    console.log("okay");
    socket.on("connectRoom", box => {
        socket.join(box);
    });
});

mongoose.connect(
    "mongodb+srv://root:root@cluster0-fkrqa.mongodb.net/root?retryWrites=true",
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("./files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

server.listen(process.env.PORT || 3000);
