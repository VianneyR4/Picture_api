import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";
import asyncLib from "async";
import models from "../../models";

// Regex Lib ...
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{6,16}$/;

// export functions as models ...
module.exports = {
    register: function (req, res) {
        // Parameters...
        let email       = req.body.email;
        let first_name  = req.body.first_name;
        let last_name   = req.body.last_name;
        let password    = req.body.password;
        let isActive    = true;
        
        // verification of variables ...
        if (email == null || first_name == null || last_name == null || password == null) return res.status(400).json({ 'error' : 'missing parameters' });
        else if (first_name.length >= 13 || first_name.length <= 3) return res.status(400).json({ 'error': 'First Name must contain betwen 4 and 12 chars!' });
        else if (last_name.length >= 13 || last_name.length <= 3) return res.status(400).json({ 'error': 'Last Name must contain betwen 4 and 12 chars!' });
        else if (!EMAIL_REGEX.test(email)) return res.status(400).json({ 'error': 'Invalid Mail!' });
        else if (!PASSWORD_REGEX.test(password)) return res.status(400).json({ 'error': 'Password must contain between 6 and 16 digits long and include at least one numeric digit' })
        
        // Authantification with waterfall ...
        asyncLib.waterfall([
            (done) => {
                models.Users.findOne({
                    attributes: ['email'],
                    where: { email: email }
                })
                .then((userFound) => {
                    done(null, userFound);
                })
                .catch((err) => {
                    return res.status(500).json({ 'error': `Unable to verify if user exist! \n [ERROR:: ${err}]` })
                })
            },
            (userFound, done) => {
                if (!userFound) {
                    bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                        done(null, bcryptedPassword);
                    })
                } else {
                    return res.status(409).json({ 'error': 'User already exist!' });
                }
            },
            (bcryptedPassword, done) => {
                models.Users.create({
                    email       : email,
                    first_name  : first_name,
                    last_name   : last_name,
                    password    : bcryptedPassword,
                    isActive    : true,
                })
                .then((newUser) => {
                    return res.status(201).json({
                        'message' : 'user created successfully',
                        'userId' : newUser
                    })
                })
                .catch((err) => {
                    return res.status(500).json({ 'error': `An arror has occured when added user... \n [ERROR:: ${err}]` });
                })
            }
        ], (err) => {
            return res.status(500).json({ 'error': `An arror has occured when added user... \n [ERROR:: ${err}]` });
        })

    },
    login: function (req, res){
        return res.status(200).json({ 'title': 'Login page'});
    }
}