const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'comment',
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', postSchema);
