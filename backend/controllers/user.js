const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { async } = require("rxjs");

exports.createUser = (req, res, next) => {
  // console.log('signup', req.body);
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    // console.log('hash',hash);
    user.save()
    .then(result => {
      // console.log('result',result);
      res.status(201).json({
        message: "User Created!",
        result: result
      });
    }).catch(err => {
      console.log('err',err);
      res.status(500).json({
        error: err
      });
    });
  });
}

exports.userLogin = async (req, res, next)=>{
  let fethedUser;
  // const user = await User.findOne({email:req.body.email});
  // if(!user) return res.sendStatus(401);
  // if(!bcrypt.compareSync(req.body.password, user.password)) return res.status(401).send({message:'invalid email/password'})
  // const token = jwt.sign({email: fethedUser.email, userId: fethedUser._id},'secret_this_should_be_longer',{expiresIn: "1h"});
  // res.status(200).send({ token:token });
  User.findOne({
    email: req.body.email
  }).then(async user => {
    console.log('findOne',user);
    console.log('req.body.password',req.body.password);
    console.log('bcrypt',bcrypt.compareSync(req.body.password, user.password));
    if(!user?.email){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fethedUser = user;
    const isAuth = await bcrypt.compareSync(req.body.password, user.password);
   return isAuth
  })
  .then(result =>{
    console.log('result====>',result);
    if(!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
     const token = jwt.sign({email: fethedUser.email, userId: fethedUser._id},
      process.env.JWT_KEY,
     {expiresIn: "1h"});
     res.status(200).json({
      token:token,
      expiresIn: 3600,
      useraid: fethedUser._id
     });

  }).catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  });
}
