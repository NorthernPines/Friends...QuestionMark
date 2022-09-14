const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      require: true,
      max: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    }

  }
)

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      min: 1,
      max: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    },
    username: {
      type: String,
      require: true
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

function formatDate(badDate) {
  const pts = badDate.split("");
  const readableDate = pts[5] + pts[6] + '/' + pts[8] + pts[9] + '/' + pts[2] + pts[3] + ' ' + pts[11] + pts[12] + ':' + pts[14] + pts[15];
  console.log("Test");
  return readableDate;
};

thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
