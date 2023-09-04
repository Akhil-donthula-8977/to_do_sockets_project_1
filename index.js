const express=require("express");
const app=express();
var http=require("http");
var server=http.createServer(app);
app.use(express.json());
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
app.get("/",(req,res)=>{
    try{
       res.send("connected")
    }
    catch(e){

    }
})

server.listen(4000,()=>{
    console.log("listening")
})
