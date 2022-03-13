const { authJwt } = require("../../middlewares");
const controller = require("./product.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/v1_1/product/:id", controller.findByPk);
  app.get("/api/v1_1/product", controller.findAll);
  app.post("/api/v1_1/product", controller.create);
  app.put("/api/v1_1/product/:id", controller.update);
  app.delete("/api/v1_1/product/:id", controller.destroy);

  app.get("/api/v1_1/product/:id/category", controller.getCategoriesFromProduct);
  app.get("/api/v1_1/product/:id/review", controller.getReviews);
  app.get("/api/v1_1/product/:id/faq", controller.getFaqs);
  app.get("/api/v1_1/product/:id/all", controller.getAllFromProduct);

};
