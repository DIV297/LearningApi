const express = require('express')
const router = express.Router()
const SUser = require('../models/StudentUser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'DivanshSignature'


/***************************************************
  add student or signup
****************************************/
router.post("/addstudent",
    [
        body('name', 'enter valid name.Name should have atleast 3 characters').isLength({ min: 3 }),
        body('password', 'Password should have atleast 8 characters').isLength({ min: 8 }),
        body('email', 'Enter valid email').isEmail()
    ], async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            //error from validation
            return response.status(400).json({ error: errors.array() })
        }
        try {
            let user = await SUser.findOne({ email: request.body.email });
            console.log(user);
            if (user) {
                return response.status(400).json({ error: 'Sorry a user with this email already exists' })
            }
            //Password Hashing with bcryptjs
            const salt = await bcrypt.genSaltSync(10);
            const securedPassword = await bcrypt.hashSync(request.body.password, salt);
            user = await SUser.create({
                name: request.body.name,
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


/************************************************************************* *
Login for student
**************************************************************************/
router.post("/loginstudent", [
    body('password', 'Password should have atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter valid email').isEmail()
], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() })
    }
    const { email, password } = request.body;
    try {
        let user = await SUser.findOne({ email });
        if (!user) {
            console.log(2)
            return response.status(400).json({ erroe: "Please login with correct crudentials" })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return response.status(400).json({ erroe: "Please login with correct crudentials" })
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

/***********************************************
 Getting student details
*************************************************/
router.post('/getstudent', fetchuser, async (request, response) => {
    try {
        userId = request.user.id;
        const user = await SUser.findById(userId).select("-password")
        response.send(user)
    } catch (error) {
        console.error(error.message);
        response.status(401).send('Internal Server Error');
    }
})
module.exports = router 