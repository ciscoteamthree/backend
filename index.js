const Server = require('socket.io');
const io = new Server();

io.set('origins', '*:*');

io.on('connection', function(socket) {
  console.log('CONNECTION', socket);
});

io.listen(3000);
