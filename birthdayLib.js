require("dotenv").config();
const { App } = require("@slack/bolt");
const fs = require('fs');
const channelId = process.env.CHANNEL_ID;

// Read birthday database
let raw = fs.readFileSync('./birthdayDB.json');
// parse the raw bytes from the file as JSON
let birthdays = JSON.parse(raw);

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

function getMonth() {
  var currentdate = new Date(); 
  curMonth = currentdate.getMonth()
  return curMonth
}

async function sendCelebrationByMonth() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  monthCeleMessage = 'Birthday stars for ' + `${monthNames[getMonth()]} ` + 'are ... ' + '\n';
  app.client.chat.postMessage({
    channel: channelId,
    text: monthCeleMessage
  });
}

module.exports = { app, sendCelebrationByMonth };



