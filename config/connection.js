const { connect, connection } = require("mongoose");

connect("mongodb://localhost/networkChatDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
