var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

messages = [
  {
    id: 1,
    text: 'Hello world im messages test',
    author: 'Luis Aneuris Tavarez',
  },
];

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).send('HELLO WORLD!');
});

io.on('connection', function (socket) {
  console.log('alguien se ha conectado con socket.io');
  socket.emit('messages', messages);
  socket.on('client-message', function (data) {
    console.log('MESSAGES RESPONSE');
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(8080, function () {
  console.log('Servidor corriendo');
});
