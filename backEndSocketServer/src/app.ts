import express from 'express';
import * as socketio from "socket.io";
import * as path from "path";

const app = express();
const port = 3000;

var server = require('http').createServer(app);


let io = require("socket.io")(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log(__dirname)
  });

  io.on('connection', function(socket:any) {
      console.log("Connection Detected",socket.id);
      
      socket.on("sendMsg", function(message: any) {
        console.log(socket.id,message)
        var personId = socket.id
        
        socket.broadcast.emit("receiveMsg",{ message: message.message,id:personId });
        
        socket.emit("receiveMsg",{ message: message.message,id:personId });
        
      });

      socket.emit("connection",{message:"connected"})




});


server.listen(8000, function() {
  console.log('Socket IO server listening on port 8000');
});