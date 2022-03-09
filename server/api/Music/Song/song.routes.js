const controller = require("./song.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1_1/song/:id", controller.findByPk);
  app.get("/api/v1_1/song", controller.findAll);
  app.post("/api/v1_1/song", controller.create);
  app.put("/api/v1_1/song/:id", controller.update);
  app.delete("/api/v1_1/song/:id", controller.destroy);

};
