const CronJob = require('cron').CronJob;
const Post = require('../models/post');

const job = new CronJob('*/5 * * * * *', async () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - 5);
  const posts = await Post.find({createdAt: {$gte: d}});

  /** Send mail */

  console.log(posts);
});

job.start();
