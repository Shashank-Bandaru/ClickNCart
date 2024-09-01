import express from 'express';
import User from '../models/userModel';
import { comparePassword, hashingPassword } from '../helpers/authHelper';
import { getToken, isAuth } from '../util';
const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
  try{
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const hPassword = await hashingPassword(req.body.password);
    user.password = hPassword || user.password;
    const updatedUser = await user.save();
    res.status(201).send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
      message:"User profile updated successfully",
      success:true
    });
  } else {
    res.status(404).send({ message: 'User Not Found' ,success:false});
  }}catch(error){
    return res.status(501).send({message:"Error while updating the user profile",success:false});
  }
});

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
  });

  if (signinUser) {
    if(!req.body.password){
      return res.status(500).send({
        success: false,
        message: 'Please enter your password',
      });
    }
    const match = await comparePassword(req.body.password, signinUser.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: 'Invalid Password',
      });
    }
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
      message:"Login Successful",
      success:true
    });
  } else {
    res
      .status(401)
      .send({ success: false, message: 'Invalid Email or Password.' });
  }
});

router.post('/register', async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  //if email/user already exists
  if (existingUser) {
    return res.status(200).send({
      success: false,
      message:
        'This email has already been registered so please go to login page or change email id',
    });
  }
  const password = req.body.password;
  const rePassword = req.body.rePassword;
  if (password !== rePassword) {
    return res.status(401).send({
      success: false,
      message: 'Both the Password and Re-Password should match',
    });
  }
  const hPassword = await hashingPassword(password);
  if(!req.body.name){
    return res.status(401).send({
      success: false,
      message: 'Name should be provided',
    });
  }
  if(!req.body.email){
    return res.status(401).send({
      success: false,
      message: 'Email should be provided',
    });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hPassword,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
      message:"Registration Successful",
      success:true
    });
  } else {
    res.status(401).send({ success: false, message: 'Invalid User Data.' });
  }
});

// TODO 
// add forgot password controller as well

export default router;
