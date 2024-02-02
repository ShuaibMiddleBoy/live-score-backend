// const mongoose = require("mongoose");

// const chatbotSch = new mongoose.Schema(
//   {
//     prompt: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//     },
//     description: {
//       type: String,
//     },
//     image: {
//       type: String, 
//     },
//   },
//   { timestamps: true }
// );

// const chatbotModel = mongoose.model("chatbots", chatbotSch);

// module.exports = { chatbotModel };
const mongoose = require("mongoose");

const chatbotSch = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
        image: {
      type: String, 
    },
  },
  { timestamps: true }
);

const chatbotModel = mongoose.model("chatbots", chatbotSch);

module.exports = { chatbotModel };