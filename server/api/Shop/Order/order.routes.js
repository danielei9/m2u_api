const { authJwt } = require("../../middlewares");
const controller = require("./order.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1_1/order/:id", controller.findByPk);
  app.get("/api/v1_1/order", controller.findAll);
  app.post("/api/v1_1/order", controller.create);
  app.put("/api/v1_1/order/:id", controller.update);
  app.delete("/api/v1_1/order/:id", controller.destroy);
  
  app.get("/api/v1_1/order/:id/all", controller.getAllFromOrder);

};
