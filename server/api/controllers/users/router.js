import * as express from 'express';
import controller from './controller.js';
import authJwt from '../../middlewares/authJwt.js';
/*
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
 */
export default express
  .Router()
  .post('/', controller.create)
  .get('/', controller.all)
  .get('/:id', controller.byId)

/*
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
*/
  .get("/api/test/all", controller.allAccess)

  .get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  )

  .get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  )

  .get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  )
