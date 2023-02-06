const express = require('express');
const router = express.Router();
const User = require('../Model/User');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

router.get('/fetchuser', async (req, res) => {
    try {
        const user = await User.find({});
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/createuser",
    async (req, res) => {        //check whether the user  with this email exist already
        // console.log(req.headers)


        console.log(req.body.namedata)
        console.log(req.body.email)
        console.log(req.body.password)



        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                console.log(user);
                return res
                    .status(400)
                    .json({ error: "sorry user with this email already exist " });
            }

            //secure pasword using bycrypt

            const salt = await bcrypt.genSaltSync(10);
            const secpass = await bcrypt.hash(req.body.password, salt);

            //create a new user
            user = await User.create({
                name: req.body.namedata,
                email: req.body.email,
                password: secpass,
            });

            /////////jasonwebtoken///////////
            const JWT_SEC = "This project belongs to $AnoshaJaved"; //token string
            // use id as a token
            const data = {
                user: {
                    id: user.id,
                },
            };

            const authtoken = jwt.sign(data, JWT_SEC);
            res.json(authtoken);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }


    })





// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required


router.post('/login', async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors


    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const paswordCompare = await bcrypt.compare(password, user.password);
        if (!paswordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const JWT_SEC = "This project belongs to $AnoshaJaved";
        const authtoken = jwt.sign(data, JWT_SEC);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    // To Get user Details By user ID
    router.route('/fetchuserid/:id').get(function (req, res) {
        let id = req.params.id;
        User.findById(id, function (err, user) {
            res.json(user);
        });
    });


})


module.exports = router;




