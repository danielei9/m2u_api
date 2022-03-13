const { authJwt } = require("../../middlewares");
const controller = require("./user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1_1/test/all", controller.allAccess);

  //app.get("/api/v1_1/user", controller.);

  app.get("/api/v1_1/user/:id", controller.findByPk);
  app.get("/api/v1_1/user", controller.findAll);
  app.post("/api/v1_1/user", controller.create);
  app.put("/api/v1_1/user/:id", controller.update);
  app.delete("/api/v1_1/user/:id", controller.destroy);

  app.get("/api/v1_1/user/:id/blog", controller.getBlogs);
  app.get("/api/v1_1/user/:id/artist", controller.getArtists);
  app.get("/api/v1_1/user/:id/order", controller.getOrders);
  app.get("/api/v1_1/user/:id/all", controller.getAllFromUser);

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
