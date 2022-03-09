const db = require("../../../models");
const Order = db.order;
//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */
/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/user
 * [
 *   {
 *       "id": 1,
 *       "username": "123",
 *       "name": "Daniel",
 *       "surname": "Burruchaga",
 *       "artist_name": "BV",
 *       "phone": "678098745",
 *       "email": "123",
 *       "pswd": "$2a$08$s37JLhtAFIdcg6O9/v1K0.P9ya5qkR39c1o3nQ18o2jvv70EMysBC",
 *       "createdAt": "2022-02-06T18:04:12.155Z",
 *       "updatedAt": "2022-02-06T18:05:10.347Z"
 *   }
 *]
 */
exports.findAll = async (req, res) => {
  console.log("Order ALL")
  await Order.findAll().then((r) => res.json(r));
};
/**
 * Buscar un user: 
 * http://localhost:3000/api/v1_1/user/1
 * 
 * 
 *    {
 *        "id": 1,
 *        "username": "123",
 *        "name": "Daniel",
 *        "surname": "Burruchaga",
 *        "artist_name": "BV",
 *        "phone": "678098745",
 *        "email": "123",
 *        "pswd": "$2a$08$s37JLhtAFIdcg6O9/v1K0.P9ya5qkR39c1o3nQ18o2jvv70EMysBC",
 *        "createdAt": "2022-02-06T18:04:12.155Z",
 *        "updatedAt": "2022-02-06T18:05:10.347Z"
 *    }
 *
 */
exports.findByPk = async (req, res) => {
  console.log("Order BY ID " + req.params.id)
  await Order.findByPk(req.params.id).then((r) => {
    if (r) res.json(r);
    else res.status(404).end();
  });
}
/**
 * crear un user nuevo: 
 * POST http://localhost:3000/api/v1_1/user/
 * 
 *   {
 *       "username": "123",
 *       "name": "Daniel",
 *       "surname": "Burruchaga",
 *       "artist_name": "BV",
 *       "phone": "678098745",
 *       "email": "123",
 *       "pswd": "1",
 *  }
 */
exports.create = async (req, res) => {
  console.log("CREATE Order")
  await Order.create({
    name: req.body.name,
    duration: req.body.duration,
    ArtistId: req.body.userId
  }).then((r) =>
    res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
  );
}
/**
 * Actualizar un user: 
 * PUT http://localhost:3000/api/v1_1/user/5
 * 
 *{
 *       "username": "123",
 *       "name": "Daniel",
 *       "surname": "Burruchaga",
 *       "artist_name": "BV",
 *       "phone": "678098745",
 *       "email": "123",
 *       "pswd": "1",
 *  }
 */
exports.update = async (req, res) => {
  try {
    let values = {
      name: req.body.name,
      duration: req.body.duration
    }
    let selector = {
      where: { id: req.params.id }
    };
    Order.findByPk(req.params.id).then(async (order) => {
      console.log(order)
      if (order) {
        await Order.update(values, selector).then((r) => {
          if (r)
            res.status(200).json({ "status": "Succesfully" });
          else
            res.status(404).json({ "status": "Error" });
        })
      }
      else res.status(404).end();
    });
  } catch (error) {
    console.log(error)
  }
}
/**
 * Delete un user : 
 * delete http://localhost:3000/api/v1_1/user/6
 */
exports.destroy = async (req, res) => {
  await Order.destroy({
    where: {
      id: req.params.id
    }
  }).then((r) => {
    if (r)
      res.status(200).json({ "status": "Succesfully" });
    else
      res.status(404).json({ "status": "Error" });
  })
}

/* *
 * getAllSongsFromOrder :  (Esta por reparar y revisar)
 * get http://localhost:3000/api/v1_1/getAllSongsFromOrder/6
 */
 exports.getAllSongsFromOrder = async (req, res) => {
  const songs = await Order.findByPk({
    include: { model: songs, as: 'songs' }
  });
    if (songs)
      res.status(200).json(songs);
    else
      res.status(404).json({ "status": "Error" });
}
