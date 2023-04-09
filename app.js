const cron = require("cron");
const lib = require("./birthdayLib");
var app = lib.app;

app.command("/birthday", async ({ ack }) => {
  try {
    await ack();
    lib.sendCelebrationByMonth();
  } catch (error) {
      console.log("err");
    console.error(error);
  }
});

(async () => {
  const port = 3000;
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);

  const firstDayofMonth = '0 8 1 * *';
  let scheduledFirstDayofMonthMessage = new cron.CronJob(firstDayofMonth, () => {
    // This runs on first day of each month at 8 am to check 
    // whether there are anyone having birthday in the month
      lib.sendCelebrationByMonth();
  });
  scheduledFirstDayofMonthMessage.start();

  const eachDay = '0 8 * * *';
  let scheduledEachDayMessage = new cron.CronJob(eachDay, () => {
    // This runs on each day at 8 am to check 
    // whether there is anyone having the birthday today
      lib.sendCelebrationByDay();
  });
  scheduledEachDayMessage.start();

})();