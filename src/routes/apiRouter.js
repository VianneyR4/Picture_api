import express from "express";
import userCtrl from "../controllers/userCtrl";

exports.router = (() => {
    let apiRouter = express.Router();

    // user routers ...
    apiRouter.post('/register', userCtrl.register);
    apiRouter.post('/login', userCtrl.login);
    apiRouter.get('/user/profile', userCtrl.getProfileUser);

    return apiRouter;
})();