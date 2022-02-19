const express = require("express")
const router = express.Router();
const User = require("../Models/user")
const bcrypt = require("bcrypt")

router.route("/users")
  .get(async (req, res) => {
    // const DB_USERS = await User.findAll()
    await User.findAll()
      .then((users) => { res.json(users) })
      .catch((e) => res.json(e.message))
  })

  .post(async (req, res) => {
    // Requset body
    let body = await req.body

    // Hashing Password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.Password, salt)

    const newUser = {
      UserName: body.UserName,
      Email: body.Email,
      Password: hashedPassword,
    }
    // Sava In Database
    User.create(newUser).then(user => {
      res.json(user)
    })
      .catch((e) => res.json(e.message))
  })
  .put(async (req, res) => {

    const body = req.body;
    const emailExists = await User.findAll({ where: { Email: body.Email } })

    if (emailExists == false) {

       // Hashing Password 
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(req.body.Password, salt)
 
       const modifiedUser = {
         UserName: await req.body.UserName,
         Email: await req.body.Email,
         Password: hashedPassword
       }
 
       User.update(modifiedUser, { where: { UserID: req.body.UserID } })
         .then((user) => {
           res.status(201).json({
             Status: Number(user[0]),
             msg: 'User update successfully.'
           })
         })
         .catch((e) => res.json(e.message))
     
    } else {
      return res.status(400).send(`email already exists `)
    }

  });

router.route("/users/edit/:Id")
  .get(async (req, res) => {
    User.User.findAll({ where: { UserID: req.params.Id } })
      .then((users) => { res.json(users) })
      .catch((e) => res.json(e.message))
  });


module.exports = router;