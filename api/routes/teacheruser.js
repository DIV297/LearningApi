const express = require('express')
const router = express.Router()
const Tuser = require('../models/TeacherUser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const { response } = require('express');
const JWT_SECRET = 'DivanshSignature'


/*********************************
signup for teachers
*******************************/
router.post("/addteacher",
    [
        body('name', 'enter valid name.Name should have atleast 3 characters').isLength({ min: 3 }),
        body('password', 'Password should have atleast 8 characters').isLength({ min: 8 }),
        body('email', 'Enter valid email').isEmail()
    ],
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ error: errors.array() })
        }

        try {
            let user = await Tuser.findOne({ email: request.body.email });
            console.log(user);
            if (user) {
                return response.status(400).json({ error: 'Sorry a user with this email already exists' })
            }
            //Password Hashing with bcryptjs
            const salt = await bcrypt.genSaltSync(10);
            const securedPassword = await bcrypt.hashSync(request.body.password, salt);
            user = await Tuser.create({
                name: request.body.name,
                subject: request.body.subject,
                password: securedPassword,
                email: request.body.email
            })
            // Authentication token given to new user
            const data = {
                user: {
                    id: user.id
                }
            }
            var token = jwt.sign(data, JWT_SECRET);
            response.send({ token });
        } catch (error) {
            response.status(500).send(error);
        }
    });


/*********************************
login for teachers
*******************************/
router.post("/loginteacher", [
    body('password', 'Password should have atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter valid email').isEmail()
], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() })
    }
    const { email, password } = request.body;
    try {
        console.log(1)
        let user = await Tuser.findOne({ email });
        if (!user) {
            console.log(2)
            return response.status(400).json({ error: "Please login with correct crudentials" })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return response.status(400).json({ error: "Please login with correct crudentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        var token = jwt.sign(data, JWT_SECRET);
        response.send({ token });
    } catch (error) {
        response.status(500).send(error);
    }
});


/*******************************************
 fetching all teacher present in database
 ********************************************/
router.get('/fetchallteacher', async (request, response) => {
    try {
        const teachers = await Tuser.find().select("-password").select("-_id")
        if (!teachers) {
            return response.status(400).send({ error: "No teacher found" })
        }
        response.send(teachers);

    } catch (error) {
        response.status(500).send(error);
    }
})


module.exports = router 