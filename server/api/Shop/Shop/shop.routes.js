const { authJwt } = require("../../middlewares");
const controller = require("./shop.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //app.get("/api/v1_1/shop/disk", controller.getAllDiskFrom);
  app.get("/api/v1_1/shop/:id", controller.findByPk);
  app.get("/api/v1_1/shop", controller.findAll);
  app.post("/api/v1_1/shop", controller.create);
  app.put("/api/v1_1/shop/:id", controller.update);
  app.delete("/api/v1_1/shop/:id", controller.destroy);
};
