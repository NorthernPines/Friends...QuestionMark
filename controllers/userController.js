const { User } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: 'thoughts', select: '-__v'})
      // .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with such ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with such ID'})
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.deleteOne({ _id: req.params.userId})
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user found with such ID'})
          : res.status(200).json({ message: 'Said person has been removed'})
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    // if friend exists
      // if user exists
        //add friend to users friend list
      // else
        //user not found
    //else
      //friend not found
    User.countDocuments({_id: req.params.friendId}, function (err, count){ 
      if(count>0){
        User.findOneAndUpdate(
          {_id: req.params.userId},
          {$push: {friends: req.params.friendId}}
        )
          .then((user) => 
            !user
              ? res.status(404).json({ message: 'UserId not found'})
              : res.status(200).json({ message: 'You are now friends'})
          )
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(404).json({ message: 'FriendId not found'});
      }
    });
  },
  removeFriend(req, res) {
    // should check if theyre friends on the platform
    User.countDocuments({_id: req.params.friendId}, function (err, count){ 
      if(count>0){
        User.findOneAndUpdate(
          {_id: req.params.userId},
          {$pull: {friends: req.params.friendId}}
        )
          .then((user) => 
            !user
              ? res.status(404).json({ message: 'UserId not found'})
              : res.status(200).json({ message: 'You are no longer friends'})
          )
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(404).json({ message: 'FriendId not found'});
      }
    });
  }
};
