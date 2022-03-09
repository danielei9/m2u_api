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
   * http://localhost:3000/api/v1_1/auth/signup
   * SEND
   * {
   *  "username": "admin",
   *   "email": "ematil",
   *   "pswd": "bcrypt"
   * }
   */
  app.post(
    "/api/v1_1/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
/** 
   * SIGNIN
   * 
   * http://localhost:3000/api/v1_1/auth/signin
   * SEND
   * {
   *  "username": "admin",
   *   "pswd": "bcrypt"
   * }
   */  
  app.post("/api/v1_1/auth/signin", controller.signin);
};
