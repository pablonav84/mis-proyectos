import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import __dirname from './utils.js'
import { router as vistaRouter } from './routes/vistaRouter.js';

const PORT = 8080;
let io;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use("/", vistaRouter)

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('error 404 - page not found');
});

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto PORT ${PORT}`);
});

let mensajes=[]
let usuarios=[]

io = new Server(server);

io.on('connection', (socket) => {
  console.log(`Cliente Conectado con el id ${socket.id}`);
  socket.emit('saludo', { emisor: 'server', mensaje: 'Bienvenido al server' });

  socket.on('confirmacion', nombre => {
usuarios.push({id:socket.id, nombre})
socket.emit("historial", mensajes)
    socket.broadcast.emit("nuevoUsuario", nombre)
  });

socket.on("mensaje", (nombre, mensaje)=>{
  mensajes.push({nombre, mensaje})
  io.emit("nuevoMensaje", nombre, mensaje)
})

socket.on("disconnect", ()=>{
  let usuario=usuarios.find(u=>u.id===socket.id)
  if(usuario){
      socket.broadcast.emit("saleUsuario", usuario.nombre)
  }
})


socket.on("connection", socket=>{
  console.log(`Se conecto un cliente con id ${socket.id}`)
});
})