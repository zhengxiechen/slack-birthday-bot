const cron = require("cron");
const lib = require("./birthdayLib");
var app = lib.app;

app.command("/birthday", async ({ ack }) => {
  try {
    await ack()
    lib.sendCelebrationByMonth()
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
          channel: process.env.CHANNEL_ID,
          text: `custom cron job date`
        });
      });
          
      // When you want to start it, use:
  scheduledMessage.start()
})();