const express = require("express");
const bodyParser = require("body-parser")
app = express();
const http = require('http');
const server = http.createServer(app);
const io =require("socket.io")(server)
const clients = new Map();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("client"));



io.on('connection', socket => {

  socket.on("mapping", function(username) {

    clients.set(socket.id, username)
  
    io.emit("message", Array.from(clients.values()))
    console.log(Array.from(clients.values()))


  })
  socket.on("disconnect", ()=>{
    clients.delete(socket.id)
    io.emit("message", Array.from(clients.values()))

  })


  socket.on("chatMessage", (message, username) =>{
    socket.broadcast.emit("messageUsers", message, username)
  })

} )




server.listen(3000, () => {
  console.log('listening on *:3000');
});
