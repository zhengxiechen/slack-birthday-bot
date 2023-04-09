const { App } = require("@slack/bolt");
require("dotenv").config();
// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

var cron = require("cron");
const channelId = process.env.CHANNEL_ID;

function getMonth() {
  var currentdate = new Date(); 
  curMonth = currentdate.getMonth()
  return curMonth
}

function sendCelebrationByMonth() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  monthCeleMessage = 'Birthday stars for ' + `${monthNames[getMonth()]} ` + 'are ... ' + '\n';
  app.client.chat.postMessage({
    channel: channelId,
    text: monthCeleMessage
  });
}

app.command("/birthday", async ({ ack }) => {
  try {
    await ack()
    sendCelebrationByMonth();
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

(async () => {
  const port = 3000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
  
  const date = '10 10 * * *'
  let scheduledMessage = new cron.CronJob(date, () => {
    // This runs every day at 10:30:00, you can do anything you want
        app.client.chat.postMessage({
          channel: channelId,
          text: `custom cron job date`
        });
      });
          
      // When you want to start it, use:
  scheduledMessage.start()
})();