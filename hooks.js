const Hue = require('philips-hue-api');
const moment = require('moment');
const jsxapi = require('jsxapi');
const rp = require('request-promise');

// 44 is demo TV, 103 is other
const xapi = jsxapi.connect('ssh://172.17.4.103', {
  username: 'admin',
  password: ''
});

xapi.on('error', err => {
  console.error('ERROR FROM XAPI', err);
  console.error(err);
});

const lightsOn = (color, duration) => {
  rp(
    'http://172.17.4.121/api/gsNyt5JWdM7YWSFvfIUddyuhgcESa3wg0SITXV2d/lights/4/state',
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ on: true, sat: 200, bri: 200, hue: color })
    }
  );
  setTimeout(
    () =>
      rp(
        'http://172.17.4.121/api/gsNyt5JWdM7YWSFvfIUddyuhgcESa3wg0SITXV2d/lights/4/state',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ on: false, sat: 200, bri: 200, hue: color })
        }
      ),
    duration * 1000
  );
};

const prompt = (title, text) => {
  xapi
    .command('UserInterface Message Prompt Display', {
      Title: title,
      Text: text,
      'Option.1': 'OK'
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
};

const alert = (title, text, dur) => {
  console.log(title, text, dur, title.length, text.dur);
  xapi
    .command('UserInterface Message Alert Display', {
      Title: title,
      Text: text,
      Duration: dur
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
};

const playSound = () => {
  xapi.command('Audio Sound Play', {
    Sound: 'Announcement'
  });
};

module.exports = { lightsOn, prompt, alert, playSound };
