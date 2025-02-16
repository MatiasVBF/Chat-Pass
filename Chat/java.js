const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Inicializa a aplicação Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir arquivos estáticos (HTML, CSS, JS) na pasta 'public'
app.use(express.static('public'));

// Quando um cliente se conecta
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');
  
  // Quando o servidor recebe uma mensagem de um cliente
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Envia a mensagem para todos os clientes
  });

  // Quando um cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Iniciar o servidor na porta 3000
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
