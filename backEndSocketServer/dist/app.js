"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
var server = require('http').createServer(app);
let io = require("socket.io")(server);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log(__dirname);
});
io.on('connection', function (socket) {
    console.log("Connection Detected", socket.id);
    socket.on("sendMsg", function (message) {
        console.log(socket.id, message);
        var personId = socket.id;
        socket.broadcast.emit("receiveMsg", { message: message.message, id: personId });
        socket.emit("receiveMsg", { message: message.message, id: personId });
    });
    socket.emit("connection", { message: "connected" });
});
server.listen(8000, function () {
    console.log('Socket IO server listening on port 8000');
});
//# sourceMappingURL=app.js.map