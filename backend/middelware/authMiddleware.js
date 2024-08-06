const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.decode(token);

      const user = await User.findById(decoded.id);
      if (!user) {
        throw new Error();
      }

      jwt.verify(token, user.password, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'Not authorized, token failed' });
          return;
        }
        req.user = user;
        next();
      });
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

module.exports = { protect };
