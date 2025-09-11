const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

/**
 * Register user
 */
const register = async (req = request, res = response) => {
    const { userName, email, password, bio, profilePicture, birthDay } = req.body

    try {
        // Check the userName
        const existingUserName = await User.findOne({ where: { userName } })
        if (existingUserName) {
            return res.status(400).json({msg:"Username already exists, try again"})
        }

        // Check the email
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({msg:"Invalid operation, cannot register the user."})
        }

        // Validation of the null data
        if (!userName || !email || !password || !birthDay) {
            return res.status(400).json({msg:"All fields are required."})
        }

        // Ensure password is a string
        const passwordString = String(password)

        // Validation of the max lenght
        if (userName.length > 15 || email.length > 100 || passwordString.length > 15|| passwordString.length < 8 || bio.length > 255 || profilePicture.length > 255) {
            return res.status(400).json({msg:"Max length exceeded."})
        }

        
        // Hash the password
        const hashedPassword = bcryptjs.hashSync(passwordString, 10)

        // Create the user
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            bio,
            profilePicture,
            birthDay
        })

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' })

        const userData = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
            birthDay: user.birthDay,
            token
        }

        res.status(201).json({ 
            data: userData,
            message: "User registered successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
/**
 * Visualize the user profile
 * localhost:8080/api/users/:id
 */

const viewProfile = async (req = request, res = response) => {
    const { id } = req.params
    
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        })
        if (!user) {
            return res.status(404).json({msg:"User not found."})
        }
        if (user.deleted) {
            return res.status(410).json({msg:"User account has been disabled, please contact support."})
        }

        res.status(200).json({ 
            data: user,
            message: "User profile retrieved successfully"
        })
            
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

/**
 * Login user
 */
const login = async (req = request, res = response) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json({msg:"User not found."})
        }
        if (user.deleted) {
            return res.status(410).json({msg:"User account has been disabled, please contact support."})
        }

        const passwordString = String(password)
        if (passwordString.length > 15 || passwordString.length < 8) {
            return res.status(400).json({msg:"Password must be between 8 and 15 characters."})
        }

        // Check the password
        const isPasswordValid = bcryptjs.compareSync(passwordString, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({msg:"Invalid password."})
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' })
        const userData = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
            birthDay: user.birthDay,
            token
        }
        res.status(200).json({
            data: userData,
            message: "User logged in successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}
module.exports = {
    register,
    viewProfile,
    login
}