import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';


export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {
        expiresIn: '15d' // Token will expire in 15 days
    });

    res.cookie('jwt-netflix',token,{
        macAge:"15*24*60*60*1000", // 15 days in milliseconds
        httpOnly:true, // Prevents xss attacks cross-site scripting attacks, make it not be accessed by JS
        sameSite:"strict", // Prevents CSRF attacks cross-site request forgery attacks
        secure: ENV_VARS.NODE_ENV !== "development",
    });
    return token;
}