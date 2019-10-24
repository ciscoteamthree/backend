const Server = require('socket.io');
const io = new Server();
const { templates } = require('./templates');
var rp = require('request-promise');
io.set('origins', '*:*');

let meeting = null;

let auth = null;
/*
{ access_token, expires_in, refresh_token, refresh_token_expires_in }
*/
if (process.env.TOKEN) {
  auth = {
    access_token: process.env.TOKEN
  };
}

io.on('connection', socket => {
  socket.emit('templates', templates);
  socket.emit('currentMeeting', meeting);
  if (auth) {
    socket.emit('token', auth.access_token);
  } else {
    socket.emit('auth_missing');
  }

  socket.on('editMeeting', editedMeeting => {
    meeting = editedMeeting;
    io.emit('currentMeeting', meeting);
  });

  socket.on('endMeeting', () => {
    meeting = null;
    io.emit('currentMeeting', meeting);
  });

  socket.on('oauth', code => {
    console.log(code);
    rp('https://api.ciscospark.com/v1/access_token', {
      method: 'POST',
      json: {
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: 'http://localhost:3000/login'
      }
    })
      .then(res => {
        auth = res;
      })
      .catch(err => {
        console.error(err);
      });
  });
});

io.listen(8000);
