const { Router } = require("express");
const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const ProdController = require("./controller/prodController")
const ChatController = require("./controller/chatController")
let app = express();
const httpServer = new HttpServer(app);
const path = require("path");
const { profile } = require("console");
const PORT = 3000;
let productos= require("./routes/index");

const db_obj = require("./db/mariadb");
const db = db_obj.client;




// Settings 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");





class Socket {
    static instancia;
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia;
        }
    }
init(){
try{
io.on('connection', async socket => {
socket.emit('init', console.log(`Nuevo usuario: ${socket.id}`));
socket.on('getProducts', async () => {
io.sockets.emit('productList', await ProdController.getProductos());
})
socket.on('newProduct', () => {
io.sockets.emit('productList', ProdController.getProductos());
});
let chat = await ChatController.getMessages();
socket.on('chatMsg', async ({email, date, msg}) => {
await ChatController.addChatMsg({ email, date, msg });
chat = await ChatController.getMessages();
io.sockets.emit('newMsg', chat);
});
io.sockets.emit('newMsg', chat);
})
}catch(error){
    console.log(error);
}
}
}


httpServer.listen(PORT, ()=>{
    console.log("Server on!");
})