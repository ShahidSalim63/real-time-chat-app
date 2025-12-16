/*🧠 Optional Improvements
Modularize input validation into a helper (e.g. validateSignupInput(req.body))

Add rate limiting or brute-force protection to login

Log login/logout events to DB for auditability

Add refresh token support for smoother UX

Ensure email is indexed in MongoDB for fast lookup:
User.createIndexes(); OR ensureIndex() if needed*/

import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import { User } from '../models/user.model.js'
import { generateToken } from '../lib/utils.js'
import mongoose from 'mongoose'

dotenv.config()

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    
    if(!fullName || !email || !password)
        return res.status(400).json({message: "All fields must be filled"})
    if(password.length < 6)
        return res.status(400).json({message: "Password length must be atleast 6 characters long"})
    //TODO: Later add further validation for the req body elements

    try {
        const user = await User.findOne({ email })
        if(user)
            return res.status(400).json({ message: 'User already exists'})

        const salt = await bcrypt.genSalt(10) //10 is default
        const hashedPwd = await bcrypt.hash(password, salt)

        const newUser = new User({ fullName, email, password: hashedPwd })
        await newUser.save()
        
        if(!newUser)
            return res.status(500).json({message: 'User creation failed'})
        if(newUser) {
            generateToken(newUser._id, res)
            console.log('User creation successful');

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
    } catch(error) {
        console.log(`Error in Sigup Controller: ${error.message}`);
        return res.status(500).json({message: 'Internal Server Error'})
    }
}
//(Maybe not) LOGIN TODO: Handle repeated login attempts if user is already logged in
export const login = async (req, res) => {
    const { email, password } = req.body 

    if(!email || !password)
        return res.status(400).json({message: 'All fields must be filled'})
    if(password.length < 6)
        return res.status(400).json({message: 'Password must be atleast 6 characters long'})

    try {
        const user = await User.findOne({ email })
        if(!user)
            return res.status(400).json({message: 'User not found'})

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if(!isCorrectPassword) 
            return res.status(400).json({message: 'Incorrect password'})

        generateToken(user._id, res)
        console.log('Login successful');
        return res.status(200).json({message: 'Login successful'})

    } catch(error) {
        console.log(`Error in Login Controller: ${error.message}`)
        return res.status(500).json({message: 'Internal Server error'})
    }
}

export const logout = (req, res) => {
    //The JWT in the cookie sent alongside the req determines which user logs out
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            path: '/'
        })

        console.log('Logged out successfully')
        return res.status(200).json({message: 'Logout successful'})

    } catch(error) {
        console.log(`Error in Logout Controller: ${error.message}`)
        return res.status(500).json({message: 'Internal Server error'})
    }
}

export const checkAuth = (req, res) => { //Check whether this needs to be GET or POST (From YT also)
    try {
        //'user' is added in protectRoute        
        console.log(`Inside Check Auth: ${req.user}`);
        return res.status(200).json(req.user)
        
    } catch (error) {
        console.log(`Error in Check Auth Controller: ${error.message}`);
        return res.status(500).json({message: 'Internal Server error'})
    }
} 

export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({users}) 

    } catch (error) {
        console.log(`Error in getAllUsers Controller: ${error.message}`);
        return res.status(500).json({message: 'Internal Server error'})
    }
}