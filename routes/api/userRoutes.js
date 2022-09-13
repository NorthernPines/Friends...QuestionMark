const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/postController');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:userId')
  .get(getOneUser)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
