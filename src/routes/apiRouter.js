import express from "express";
import userCtrl from "../controllers/userCtrl";

exports.router = (() => {
    let apiRouter = express.Router();

    // user routers ...
    apiRouter.get('/login', userCtrl.test);

    return apiRouter;
})();