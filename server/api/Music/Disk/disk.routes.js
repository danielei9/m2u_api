const controller = require("./disk.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1_1/disk/:id", controller.findByPk);
  app.get("/api/v1_1/disk", controller.findAll);
  app.post("/api/v1_1/disk", controller.create);
  app.put("/api/v1_1/disk/:id", controller.update);
  app.delete("/api/v1_1/disk/:id", controller.destroy);

};
