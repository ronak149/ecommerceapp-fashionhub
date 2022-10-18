import express from 'express';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        if(users) {
            res.send(users);
        }
        else {
            res.status(404).send({message: 'No users found'});
        }
    }
    catch(err) {
        console.log(err.message);
    }
    
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
}));

userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if(userExists){
        res.status(401).send({ message: 'User already exists !' });
    }
    else {
        const newUser = new User({
            name: req.body.fullName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        });
        const user = await newUser.save();
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
        });
    }
}));

userRouter.put('/update-profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.fullName || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }

        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        });
    }
    else {
        res.status(404).send({message: 'User not found'});
    }
}));

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        await user.remove();
        res.send({ message: 'User deleted!'});
    }
     else {
        res.status(404).send({ message: 'User not found!' });
     }
}));

export default userRouter;