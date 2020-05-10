const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")

exports.signUp = (req, res, next) => {
    console.log(req.body.email + " email")
    console.log(req.body.password + " password")
    bcrypt.hash(req.body.password, 10)
        .then(
            hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save().then(
                    result => {
                        res.status(201).json({
                            message: "User added successfully",
                            user: result
                        })
                    }
                )
                    .catch(error => {
                        res.status(500).json({
                            message: "Invalid Authentication Credencials!!",
                            error: error
                        })
                    })
            }
        )
}

exports.login = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            fetchedUser = user;
            if (!user) {
               // console.log("email not found")
                res.status(401).json({
                    message: "Account with this email is not available!!",
                })
            }
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                res.status(401).json({
                    message: "Incorrect Password!!",
                })
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            )
           
            res.status(201).json({
                token : token,
                expiresIn : 3600,
                userId : fetchedUser._id
            });
        })
        .catch(result => {
            return res.status(401).status({
                message: "Invalid Authentication Credencials!!"
            })
        })
}