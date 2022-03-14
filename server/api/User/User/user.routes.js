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
  app.put("/api/v1_1/user/:id",[authJwt.verifyToken], controller.update);
  app.delete("/api/v1_1/user/:id",[authJwt.verifyToken], controller.destroy);

  app.get("/api/v1_1/user/:id/blog", controller.getBlogs);
  app.get("/api/v1_1/user/:id/artist", controller.getArtists);
  app.get("/api/v1_1/user/:id/order", controller.getOrders);
  app.get("/api/v1_1/user/:id/all", controller.getAllFromUser);

  /** 
   * Para la authentificación:
   *  - Hacer SignUp y tener un Usuario User/Mod/Admin
   *  - Hacer SignIn y obtener 
   *      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3MTk4NTA4LCJleHAiOjE2NDcyODQ5MDh9.WL7eHXH8XJac56dYUfThXN-mWbauoYCYuy8qDTH-yLo"
   *  - Desde el cliente es necesari estipular un header :
   *      KEY: x-access-token, VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3MTk4NTA4LCJleHAiOjE2NDcyODQ5MDh9.WL7eHXH8XJac56dYUfThXN-mWbauoYCYuy8qDTH-yLo
   *  - Añadir en cada ruta que sea necesaria el middleware como se muestra a continuación
   */
  
  // PARA USERS QUE PUEDAN EDITAR Y TAL SU INFO
  app.get(
    "/api/v1_1/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  // PARA MODS QUE PUEDAN EDITAR Y TAL SU INFO Y MAS
  app.get(
    "/api/v1_1/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  // PARA ADMINS QUE PUEDAN EDITAR TODO
  app.get(
    "/api/v1_1/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
