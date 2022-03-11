const { authJwt } = require("../../middlewares");
const controller = require("./post.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/v1_1/post/:id", controller.findByPk);
  app.get("/api/v1_1/post", controller.findAll);
  app.post("/api/v1_1/post", controller.create);
  app.put("/api/v1_1/post/:id", controller.update);
  app.delete("/api/v1_1/post/:id", controller.destroy);
  app.get("/api/v1_1/post/:id/comment", controller.getComments);
};
