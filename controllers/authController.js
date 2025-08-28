import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import User from "../models/User.js";
const generateToken = (user) => {
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
};

export const registerUser = async (req,res) => {
    const {username,email,password} = req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json( {message: 'User already exists'});

        const user = await User.create({username,email,password});
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email:user.email,
            token:generateToken(user)
        });
    } catch(error) {
        res.status(500).json( {message: 'Server Error'});
    }
};

export const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials'});

        const token = generateToken(user);

        res.json({success:true,
            message:'User Logged In Successfully',
            token, 
            data:user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
};