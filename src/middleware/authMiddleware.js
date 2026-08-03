import jwt from 'jsonwebtoken';
import Admin from '../modules/auth/admin.model.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select('-password');
      
      if (req.admin && req.admin.isBlocked) {
        res.status(403);
        throw new Error('Not authorized, user is blocked');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      res.status(403);
      throw new Error(`Role: ${req.admin ? req.admin.role : 'unknown'} is not allowed to access this resource`);
    }
    next();
  };
};

export { protect, authorizeRoles };
