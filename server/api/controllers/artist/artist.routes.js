const { authJwt } = require("../../middlewares");
const controller = require("./artist.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1_1/artist/disk", controller.getAllDiskFrom);
  app.get("/api/v1_1/artist/:id", controller.findByPk);
  app.get("/api/v1_1/artist", controller.findAll);
  app.post("/api/v1_1/artist", controller.create);
  app.put("/api/v1_1/artist/:id", controller.update);
  app.delete("/api/v1_1/artist/:id", controller.destroy);

  app.get(
    "/api/v1_1/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/v1_1/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/v1_1/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
