const controller = require("./playlist.controller");
const { authJwt } = require("../../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1_1/playlist/:id", controller.findByPk);
  app.get("/api/v1_1/playlist", controller.findAll);
  app.post("/api/v1_1/playlist", controller.create);
  app.put("/api/v1_1/playlist/:id", controller.update);
  app.delete("/api/v1_1/playlist/:id", controller.destroy);

};
