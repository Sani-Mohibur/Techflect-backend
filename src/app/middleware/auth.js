import jwt from 'jsonwebtoken';
import Admin from '../modules/auth/admin.model.js';
import AppError from '../errors/AppError.js';
import config from '../config/index.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt_secret);
      req.admin = await Admin.findById(decoded.id).select('-password');
      
      if (req.admin && req.admin.isBlocked) {
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
    if (!req.admin || !roles.includes(req.admin.role)) {
      throw new AppError(403, `Role: ${req.admin ? req.admin.role : 'unknown'} is not allowed to access this resource`);
    }
    next();
  };
};

export { protect, authorizeRoles };
