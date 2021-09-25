import express from "express";
import userCtrl from "../controllers/userCtrl";
import fileCtrl from "../controllers/fileCtrl";

exports.router = (() => {
    let apiRouter = express.Router();

    // user routers ...
    apiRouter.post('/register', userCtrl.register);
    apiRouter.post('/login', userCtrl.login);
    apiRouter.get('/user/profile', userCtrl.getProfileUser);

    // image routers ...
    apiRouter.post('/images/upload', fileCtrl.uploadFIle);

    return apiRouter;
})();