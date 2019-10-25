const Server = require('socket.io');
const io = new Server();
const { templates } = require('./templates');
var rp = require('request-promise');
io.set('origins', '*:*');
const dotenv = require('dotenv');
dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

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

const redirectUri = encodeURIComponent(process.env.REDIRECT_URL);
const loginUrl = `https://api.ciscospark.com/v1/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=spark%3Akms%20spark%3Aall%20spark-admin%3Adevices_read%20spark-compliance%3Arooms_read&state=set_state_here`;

io.on('connection', socket => {
  socket.emit('templates', templates);
  socket.emit('currentMeeting', meeting);
  if (auth) {
    socket.emit('token', auth.access_token);
  } else {
    socket.emit('auth_missing', loginUrl);
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
    rp('https://api.ciscospark.com/v1/access_token', {
      method: 'POST',
      json: {
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.REDIRECT_URL
      }
    })
      .then(res => {
        auth = res;
        io.emit('token', auth.access_token);
      })
      .catch(err => {
        console.error(err);
      });
  });
});

io.listen(8000);
