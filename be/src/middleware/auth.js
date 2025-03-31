const { verifyAccessToken } = require('../utils/jwt');

const {findUserById} = require('../user/user.repository');

const auth = async (req, res, next) => {
  // const token = req.header('Authorization');

  // if (token === 'Bearer secret-token') {
  //   next(); // Proceed to the next middleware or route
  // } else {
  //   res.status(401).json({ message: 'Unauthorized' });
  // }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    const decoded = verifyAccessToken(token);
    const user = await findUserById(decoded.userId);
    
    if (!user) return res.status(403).send({ message: 'Forbidden' });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).send({ message: 'Forbidden' })
  }
};

module.exports = { auth };