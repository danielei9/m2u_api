const controller = require("./orderDetails.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1_1/orderDetails/:id", controller.findByPk);
  app.get("/api/v1_1/orderDetails", controller.findAll);
  app.post("/api/v1_1/orderDetails", controller.create);
  app.put("/api/v1_1/orderDetails/:id", controller.update);
  app.delete("/api/v1_1/orderDetails/:id", controller.destroy);

  app.get("/api/v1_1/orderDetails/:id/all", controller.getAllFromOrderDetails);

};
