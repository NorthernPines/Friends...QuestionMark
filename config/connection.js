const { connect, connection } = require('mongoose');

connect('mongodb://localhost/Friends...QuestionMark', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
