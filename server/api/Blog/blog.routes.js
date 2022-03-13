const controller = require("./blog.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/v1_1/blog/:id", controller.findByPk);
  app.get("/api/v1_1/blog", controller.findAll);
  app.post("/api/v1_1/blog", controller.create);
  app.put("/api/v1_1/blog/:id", controller.update);
  app.delete("/api/v1_1/blog/:id", controller.destroy);

  app.get("/api/v1_1/blog/:id/post", controller.getPosts);
  app.get("/api/v1_1/blog/:id/all", controller.getAllFromBlog);
  //app.get("/api/v1_1/blog/all", controller.getAllFromAllBlogs);
  
};
