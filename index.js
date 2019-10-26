const Server = require('socket.io');
const io = new Server();
const { templates } = require('./templates');
const { meeting: initialMeeting } = require('./meeting');

const { lightsOn, alert, prompt, playSound } = require('./hooks');

var querystring = require('querystring');
var rp = require('request-promise');
io.set('origins', '*:*');

const dotenv = require('dotenv');
dotenv.config();

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
const loginUrl = `https://api.ciscospark.com/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=spark%3Akms%20spark%3Aall%20spark-admin%3Adevices_read%20spark-compliance%3Arooms_read&state=set_state_here`;

const netatmoDeviceId = encodeURIComponent(process.env.NETATMO_DEVICE_ID);
let netatmoAccessToken = process.env.NETATMO_ACCESS_TOKEN;

const getSensorData = () => {
  return rp(
    `https://api.netatmo.com/api/getstationsdata?access_token=${netatmoAccessToken}&device_id=${netatmoDeviceId}`
  )
    .then(res => {
      const device = JSON.parse(res).body.devices[0];
      return {
        co2: device.dashboard_data.CO2,
        temperature: device.dashboard_data.Temperature,
        noise: device.dashboard_data.Noise
      };
    })
    .catch(err => {
      console.error(err);
      console.log('Fetching environment data failed');
      getNetatmoAccessToken();
    });
};

const getNetatmoAccessToken = () => {
  console.log('fetching new access token');
  const form = {
    grant_type: 'refresh_token',
    client_id: process.env.NETATMO_CLIENT_ID,
    client_secret: process.env.NETATMO_CLIENT_SECRET,
    refresh_token: process.env.NETATMO_REFRESH_TOKEN
  };
  var formData = querystring.stringify(form);
  var contentLength = formData.length;

  return rp(`https://api.netatmo.com/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  })
    .then(res => {
      netatmoAccessToken = JSON.parse(res).access_token;
      console.log('NEW NETATMO ACCESS TOKEN', netatmoAccessToken);
    })
    .catch(err => {
      console.error(err);
    });
};

const colors = {
  red: 0,
  blue: 40000,
  green: 25000
};

let lastSensorReading = null;
let lastSensorWarning = 0;
const sensorThreshold = 400; // 400ppm is normal, should be higher
const sensorTimeout = 60; // 1 min between alerts

const sensorWarn = () => {
  const now = Date.now();
  const diff = now - lastSensorWarning;
  if (diff > sensorTimeout * 1000) {
    console.log('WARN', lastSensorReading.co2);

    lightsOn(colors.blue, 10);
    alert(
      `CO2 readings are dangerously high at ${lastSensorReading.co2} parts per million. You should open a window or take a break`
    );
    lastSensorWarning = now;
  }
};

const sensorDataToSocketIO = () => {
  getSensorData().then(sensorData => {
    if (!sensorData) {
      return;
    }
    console.log('sensor data', sensorData);
    lastSensorReading = sensorData;
    if (lastSensorReading.co2 > sensorThreshold) {
      sensorWarn();
    }
    io.emit('sensorData', sensorData);
  });
};

sensorDataToSocketIO();
const sensorInterval = setInterval(sensorDataToSocketIO, 10 * 1000);

io.on('connection', socket => {
  console.log('connect');
  if (lastSensorReading) {
    socket.emit('sensorData', lastSensorReading);
  }
  if (auth && auth.user) {
    socket.emit('user', auth.user);
  }
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

  socket.on('sliceEnd', name => {
    playSound();
    setTimeout(name => alert('This section is almost done'), 1000);
    lightsOn('blue', 8);
  });

  socket.on('meetingEnd', () => {
    playSound();
    setTimeout(() => alert('The meeting is about to end.'));
  });

  socket.on('endMeeting', () => {
    meeting = null;
    io.emit('currentMeeting', meeting);
  });

  socket.on('oauth', async code => {
    console.log('oauth');
    const res = await rp('https://api.ciscospark.com/v1/access_token', {
      method: 'POST',
      json: {
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.REDIRECT_URL
      }
    });
    auth = res;
    console.log('new auth', auth);
    socket.emit('token', auth.access_token);

    const userRes = await rp('https://api.ciscospark.com/v1/people/me', {
      headers: {
        Authorization: `Bearer ${res.access_token}`
      }
    });
    if (userRes) {
      const jsonUser = JSON.parse(userRes);
      auth.user = jsonUser;
      socket.emit('user', jsonUser);
    }
  });
});

io.listen(8000);
