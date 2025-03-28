// const { verifyAccessToken } = require('../utils/jwt');

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (token === 'Bearer secret-token') {
    next(); // Proceed to the next middleware or route
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { auth };