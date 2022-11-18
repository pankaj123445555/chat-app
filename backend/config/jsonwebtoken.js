const jwt = require("jsonwebtoken");

// pankaj is a secret key

const generateToken = (id) => {
  return jwt.sign({ id }, 'pankaj', {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
