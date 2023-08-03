import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc Register the user
//@route POST /api/users/register
//@ access public

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password is :", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(user);
    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User Data is not valid");
    }
    res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@ access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!!");
    }
    const user = await User.findOne({ email });
    // compare password with hash password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
            process.env.ACCESS_TOKEN_SECERT,
            {expiresIn: "15m"}
        );
        res.status(200).json({ accessToken });
    }else {
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
    // res.json({ message: "Login user" });
});

//@desc Current user info
//@route GET /api/users/current
//@ access private

const currentUser = asyncHandler(async (req, res) => {
    // res.json({ message: "Current user information" });
    res.json(req.user);
});


export { registerUser, loginUser, currentUser };