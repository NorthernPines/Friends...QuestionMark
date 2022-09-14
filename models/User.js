const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
