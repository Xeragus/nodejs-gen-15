var CronJob = require('cron').CronJob;
var job = new CronJob('*/10 * * * * *', () => {
  console.log('You will see this message every 10 seconds');
});
job.start();