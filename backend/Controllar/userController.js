let router = require('express').Router();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
const UserValidation = require("../Validation/validations")

const User = require('../Models/user')


router.post("/login", async (req, res) => {


    const loginUser = await User.findAll({ where: { Email: req.body.Email } })

    // res.send(loginUser)

    if (loginUser == false) { return res.status(400).send(`email doen't  exists `) }

    const validPassword = await bcrypt.compare(req.body.Password, loginUser[0].Password)

    if (!validPassword) {
        res.status(400).send(`invalid password`)
    }

    const token = jwt.sign({ Email: loginUser.Email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
    res.header('Authorization', "Bearer" + token).status(200).json({
        token: token,
        expiresIn: 1000
    })

})

router.post("/register", async (req, res) => {
    const body = req.body;
    const emailExists = await User.findAll({ where: { Email: body.Email } })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.Password, salt)

    if (emailExists == false) {
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
    } else {
        return res.status(400).send(`email already exists `)
    }


})

module.exports = router;