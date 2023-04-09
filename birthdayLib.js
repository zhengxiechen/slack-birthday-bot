require("dotenv").config();
const { App } = require("@slack/bolt");
const fs = require('fs');
environment = process.env.ENVIRONMENT;
const channelId = environment == "PRODUCTION" ? process.env.CHANNEL_ID : process.env.TEST_CHANNEL_ID

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

function getDate() {
  var currentdate = new Date(); 
  curDate = currentdate.getDate()
  return curDate
}

async function sendCelebrationByMonth() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  var curMonth = getMonth();
  var foundBirthday = false;
  monthCeleMessage = 'Birthday stars for ' + `${monthNames[curMonth]} ` + 'are ... ' + '\n';
  birthdays.forEach(eachBirthday => {
    if (curMonth + 1 == eachBirthday.month) { // +1 to match month numbers with index 
      foundBirthday = true;
      monthCeleMessage += "<@" + eachBirthday.id + ">" + " " + "-" + " "
                +`${eachBirthday.month}.`
                + `${eachBirthday.date}`
                + "\n";
    }
  })
  if (foundBirthday) {
    monthCeleMessage += `:birthday: \n`;
  } else {
    monthCeleMessage += `none :cry: \n`;
  }
  app.client.chat.postMessage({
    channel: channelId,
    text: monthCeleMessage
  });
}

async function sendCelebrationByDay() {
  var curMonth = getMonth();
  var curDay = getDate();
  birthdays.forEach(eachBirthday => {
    if (curMonth + 1 == eachBirthday.month && curDay == eachBirthday.date) {
      celeMessage = "Happy Birthday " + "<@" + eachBirthday.id + ">" + `! :tada::cake:` + "\n";

      app.client.chat.postMessage({
        channel: channelId,
        text: celeMessage
      });
    }
  })

}

module.exports = { app, sendCelebrationByMonth, sendCelebrationByDay };



