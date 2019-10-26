const Hue = require('philips-hue-api');
const moment = require('moment');
const jsxapi = require('jsxapi');

const xapi = jsxapi.connect('ssh://172.17.4.103', {
  username: 'admin',
  password: ''
});

xapi.on('error', err => {
  console.error(err);
});

const lightsOn = (color, duration) => {
  const strip = Hue(
    'http://172.17.4.121/api/gsNyt5JWdM7YWSFvfIUddyuhgcESa3wg0SITXV2d/'
  ).lights(4);
  strip.hue(color).on();
  //strip.on();
  setTimeout(() => strip.off(), duration * 1000);
};

const prompt = (title, text) => {
  xapi.command('UserInterface Message Prompt Display', {
    Title: title,
    Text: text,
    Option: {
      1: 'OK'
    }
  });
};

const alert = (title, text, dur) => {
  xapi.command('UserInterface Message Alert Display', {
    Title: title,
    Text: text,
    Daration: dur
  });
};

const playSound = () => {
  xapi.command('Audio Sound Play', {
    Sound: Announcement
  });
};

module.exports = { lightsOn, prompt, alert, playSound };
