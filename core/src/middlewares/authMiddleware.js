import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // Add user info to request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  
  if (!token)
    return res.status(401).json({ error: "Token missing or invalid" });

  jwt.verify(token, 'secret', { algorithms: ['HS256'] },(err, user) => {
    if (err)  { console.error('JWT Verification Error:', err.message); return res.status(403).json({ error: "Invalid token" });}
    req.user = user;
    next();
  });
};

// Middleware for verifying admin role
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};


// export const test = (error, req, res, next) => {
 
//   return res.status(403).json({ error: "handling error" });
 
// };
