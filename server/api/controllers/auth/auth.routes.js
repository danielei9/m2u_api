const { verifySignUp } = require("../../middlewares");
const controller = require("./auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  /** 
   * SIGNUP
   * 
   * http://localhost:3000/api/V1/auth/signup
   * {
   *  "username": "admin",
   *   "email": "ematil",
   *   "pswd": "bcrypt"
   * }
   */
  app.post(
    "/api/V1/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
/** 
   * SIGNUIN
   * 
   * http://localhost:3000/api/V1/auth/signin
   * {
   *  "username": "admin",
   *   "email": "ematil",
   *   "pswd": "bcrypt"
   * }
   */  
  app.post("/api/V1/auth/signin", controller.signin);
};
