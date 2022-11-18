const express = require("express");
// const res = require("express/lib/response");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRouter");

const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

connectDB();
const app = express();

var bodyParser = require("body-parser");
const { Socket } = require("socket.io");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// express.json is use to accept the data in json format when we send the data through any post request
app.use(express.json());

require("dotenv").config();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const Port = 5000;

const server = app.listen(5000, console.log(`server is running on port ${Port}`));

const io = require('socket.io')(server,{
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
})

io.on('connection',function(socket) {
  console.log('socket connection established');

  socket.on("setup",(userData)=>{
    socket.join(userData._id)
    socket.emit("connected")
  })
  socket.on("join-chat",(room)=>{
    socket.join(room)
    console.log("user joined room" +room)
  })
   
   socket.on("newMessage",(newMessageReceived)=>{
    
    var chat = newMessageReceived.chat;
     
    if(!chat.users) return console.log("chat.users not defined")

    chat.users.forEach((user) => {
      
      if(user._id == newMessageReceived.sender._id)return;
      socket.in(user._id).emit("message received",newMessageReceived);
    });
   })
});