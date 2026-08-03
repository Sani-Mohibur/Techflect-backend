import jwt from 'jsonwebtoken';
import User from '../modules/auth/user.model.js';
import AppError from '../errors/AppError.js';
import config from '../config/index.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt_secret);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (req.user && req.user.isBlocked) {
        throw new AppError(403, 'Not authorized, user is blocked');
      }

      next();
    } catch (error) {
      console.error(error);
      throw new AppError(401, 'Not authorized, token failed');
    }
  }

  if (!token) {
    throw new AppError(401, 'Not authorized, no token');
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(403, `Role: ${req.user ? req.user.role : 'unknown'} is not allowed to access this resource`);
    }
    next();
  };
};

export { protect, authorizeRoles };
