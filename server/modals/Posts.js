const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  title: {
    type: String,
    default: null,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
  updateAt: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Posts", PostsSchema);
