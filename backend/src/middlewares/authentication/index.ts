import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export  function authenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }


  
  const decoded =  jwt.verify(token, "secretKey"); 
  try {
    const decoded = jwt.verify(token, "secretKey"); 
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
}
