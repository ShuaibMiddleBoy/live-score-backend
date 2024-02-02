const express = require("express");
const userRouter = express.Router();
const { signUp, signIn, getIsAdmin } = require("../controller/user");
const { authenticateJWT, isAdmin } = require("../middleware/middleware");

userRouter.post("/user-signup", signUp);
userRouter.post("/user-signin", signIn);
userRouter.get("/user-is-admin", authenticateJWT, getIsAdmin);
module.exports = { userRouter };
