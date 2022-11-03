const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdTime) => moment(createdTime).format("MMMM Do YYYY, h:mm:ss a"),
  },

  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

const Thought = model("Thought", thoughtSchema);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },

  reactionBody: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 280,
  },

  username: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdTime) => moment(createdTime).format("MMMM Do YYYY, h:mm:ss a"),
  },
});

module.exports = { Thought, reactionSchema };
