import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { User } from '../models/user.model.js'

dotenv.config()

export const protectRoute = async (req, res, next) => {
    try {
        console.log(`Inside protectRoute \nCookie: ${req.cookies.jwt} \n`);
        
        const token = req.cookies.jwt
        if(!token)
            return res.status(401).json({message: 'Unauthorized - No token provided'})
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded)
            return res.status(401).json({message: 'Unauthorized - Invalid token or token expired'})
    
        const user = await User.findById(decoded.userId).select("-password")
        if(!user)
            return res.status(404).json({message: 'User not found'})
    
        //console.log(`Req body: ${req.headers}`);
        req.user = user
        
        return next()

    } catch (error) {
        console.log(`Error in Auth Middleware: ${error.message}`);
        return res.status(500).json({message: 'Internal Server error'})
    }
}