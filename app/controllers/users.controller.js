const { selectUserByUsername } = require("../models/users.models.js");

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username)
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};
