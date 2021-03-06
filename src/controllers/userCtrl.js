import bcrypt from "bcrypt";
import asyncLib from "async";
import models from "../../models";
import jwt from "../../token/jwt";


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
        
        // verification of variables ...

        // status 400...
        if (email == null || first_name == null || last_name == null || password == null) return res.status(200).json({ 'error' : 'missing parameters' });
        else if (first_name.length >= 13 || first_name.length <= 3) return res.status(200).json({ 'error': 'First Name must contain betwen 4 and 12 chars!' });
        else if (last_name.length >= 13 || last_name.length <= 3) return res.status(200).json({ 'error': 'Last Name must contain betwen 4 and 12 chars!' });
        else if (!EMAIL_REGEX.test(email)) return res.status(200).json({ 'error': 'Invalid Mail!' });
        else if (!PASSWORD_REGEX.test(password)) return res.status(200).json({ 'error': 'Password must contain between 6 and 16 digits long and include at least one numeric digit' })
        
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
                    // status 400...
                    return res.status(200).json({ 'error': `Unable to verify if user exist! \n [ERROR:: ${err}]` })
                })
            },
            (userFound, done) => {
                if (!userFound) {
                    bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                        done(null, bcryptedPassword);
                    })
                } else {
                    // status 409...
                    return res.status(200).json({ 'error': 'User already exist!' });
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
                    // status 500...
                    return res.status(200).json({ 'error': `An arror has occured when added user... \n [ERROR:: ${err}]` });
                })
            }
        ], (err) => {
            // status 500...
            return res.status(200).json({ 'error': `An arror has occured when added user... \n [ERROR:: ${err}]` });
        })

    },
    login: function (req, res){
        
        let email     = req.body.email;
        let password  = req.body.password;
        
        if (email == null || password == null){
            // status 400...
            return res.status(200).json({ 'error': 'missing parameters!' });
        }

        // Authantification with waterfall ...
        asyncLib.waterfall([
            (done) => {
                models.Users.findOne({
                        where: { email: email, isActive: true }
                    })
                    .then((UserFound) => {
                        done(null, UserFound);
                    })
                    .catch((err) => {
                        // status 500...
                        return res.status(200).json({ 'error': 'Unable to verif user!' })
                    })
            },
            (UserFound, done) => {
                if (UserFound) {
                    bcrypt.compare(password, UserFound.password, (errBcrypt, resultBcrypt) => {
                        done(null, resultBcrypt, UserFound);
                    });
                } else {
                    // status 404...
                    return res.status(200).json({ 'error': 'Email not found!' })
                }
            },
            (resultBcrypt, UserFound) => {
                if (resultBcrypt) {
                    return res.status(200).json({
                        'msg': 'login successfully!',
                        'user': UserFound,
                        'token': jwt.generateToken(UserFound),
                    })
                } else {
                    // status 404...
                    return res.status(200).json({ 'error': 'Invalid password!' })
                }
            }
        ], (err) => {
            if (!err) {
                return res.status(200).json({ 'msg': 'User connected successfully!' });
            } else {
                // status 400...
                return res.status(200).json({ 'error': 'An arror has occured while the user connexion...' });
            }
        });
    },
    getProfileUser: function (req, res) {

        // get token from client params...
        let headersAuth = req.headers['authorization'];

        // call the jwt func to check if the token is still valid ...
        let myUserId = jwt.getUserId(headersAuth); // the token expire after 1h ...

        if (myUserId < 0) {
            // status.400...
            return res.status(200).json({ 'error': 'You must be connected first...' });
        }

        asyncLib.waterfall([
            () => {
                models.Users.findOne({
                    where: { id : myUserId },
                    include: [{model: models.Images}],
                })
                .then((userData) => {
                    if (userData) {
                        return res.status(200).json({ 
                            'message' : 'successful',
                            'userData' : userData
                        })
                    } else {
                        // status 400...
                        return res.status(200).json({ 'error' : 'You must be connected first...' })
                    }
                })
                .catch((err) => {
                    // status 500...
                    return res.status(200).json({ 'error': `An arror has occured when getting user data... \n [ERROR:: ${err}]` });
                })
            }
        ], (err) => {
            // status 500...
            return res.status(200).json({ 'error': `An arror has occured when getting user data... \n [ERROR:: ${err}]` });
        })
    }
}