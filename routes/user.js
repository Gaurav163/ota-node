const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const email = require("../controllers/email");

router.route("/signup").post(async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({ message: "Email Already Used!" });
        } else {

            const newuser = new User(req.body);
            newuser.password = await User.hashPassword(newuser.password);
            console.log(newuser);
            await newuser.save();
            let payload = {
                email: newuser.email,
                validtill: Date.now() + 24 * 60 * 60 * 1000 * 30
            }
            const token = jwt.sign(payload, process.env.Email_Verify_Token);
            const link = process.env.HOST + "/user/verify/" + token;
            await email.sendVerifyMail(newuser.email, newuser.name, link);
            res.status(200).json({ user: newuser });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

router.route("/verify/:token").get(async (req, res) => {
    try {
        const data = jwt.verify(req.params.token, process.env.Email_Verify_Token);
        if (data.time < Date.now()) {
            res.status(200).send("Link Expired");
        } else {
            const user = await User.findOne({ email: data.email });
            user.verified = true;
            await user.save();
            res.send(`
            <html>
            <head>
                <title>Verify Email</title>
            </head>
            <script>
                setTimeout(()=>{
                    window.location.replace("https://otapi.netlify.com/signin")
                },3000);
            </script>
            <body>
                <center>
                    <h1>Email verified. Redirecting . . .</h1>
                </center>
            </body>
            </html>`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Invalid Token");
    }
})

router.route("/signin").post(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(400).json({ message: "Email Not Exits" });
        }
        // else if (!user.verified) {
        //     res.status(401).json({ message: "Account Not Verified" });
        // }
        else {
            if (User.comparePasswords(req.body.password, user.password)) {
                const payload = {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
                const token = jwt.sign(payload, process.env.JWT_secret_token);
                res.status(200).json({ token, user: payload });

            }
            else {
                res.status(400).json({ message: "wrong Password" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Error Occured", error });
    }
})

module.exports = router;