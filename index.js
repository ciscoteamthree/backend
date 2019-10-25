const Server = require('socket.io');
const io = new Server();
const { templates } = require('./templates');
const { meeting: initialMeeting } = require('./meeting');

var rp = require('request-promise');
io.set('origins', '*:*');

const dotenv = require('dotenv');
dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let auth = null;
/*
{ access_token, expires_in, refresh_token, refresh_token_expires_in }
*/

if (process.env.TOKEN) {
  auth = {
    access_token: process.env.TOKEN
  };
}

let meeting = initialMeeting;

const redirectUri = encodeURIComponent(process.env.REDIRECT_URL);
const loginUrl = `https://api.ciscospark.com/v1/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=spark%3Akms%20spark%3Aall%20spark-admin%3Adevices_read%20spark-compliance%3Arooms_read&state=set_state_here`;

const netatmoAccessToken = process.env.NETATMO_ACCESS_TOKEN;
const netatmoDeviceId = encodeURIComponent(process.env.NETATMO_DEVICE_ID);

const getSensorData = () => {
  return rp(
    `https://api.netatmo.com/api/getstationsdata?access_token=${netatmoAccessToken}&device_id=${netatmoDeviceId}`
  )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
};

io.on('connection', socket => {
  console.log('connect');
  socket.emit('templates', templates);
  socket.emit('currentMeeting', meeting);
  if (auth) {
    socket.emit('token', auth.access_token);
  } else {
    socket.emit('auth_missing', loginUrl);
  }

  socket.on('editMeeting', editedMeeting => {
    console.log('editMeeting');
    meeting = editedMeeting;
    io.emit('currentMeeting', meeting);
  });

  socket.on('endMeeting', () => {
    meeting = null;
    io.emit('currentMeeting', meeting);
  });

  socket.on('oauth', code => {
    console.log('oauth');
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
