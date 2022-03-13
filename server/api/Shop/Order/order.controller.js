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
  try {
    console.log("Order ALL")
    await Order.findAll().then((r) => res.json(r));
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
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
  try {
    console.log("Order BY ID " + req.params.id)
    await Order.findByPk(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
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
  try {
    console.log("CREATE Order")
    await Order.create({
      dateBuy: req.body.dateBuy,
      dateSend: req.body.dateSend,
      timeRecived: req.body.timeRecived,
      shipAddres: req.body.shipAddres,
      city: req.body.city,
      country: req.body.country,
      phone: req.body.phone,
      shippingCost: req.body.shippingCost,
      tax: req.body.tax,
      email: req.body.email,
      shipped: req.body.shipped,
      date: req.body.date,
      trackNumber: req.body.trackNumber,
      price: req.body.price,
      sku: req.body.sku,
      ShopId: req.body.ShopId,
      UserId: req.body.UserId
    }).then((r) =>
      res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
    );
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
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
      dateSend: req.body.dateSend,
      timeRecived: req.body.timeRecived,
      shipAddres: req.body.shipAddres,
      city: req.body.city,
      country: req.body.country,
      phone: req.body.phone,
      shippingCost: req.body.shippingCost,
      tax: req.body.tax,
      email: req.body.email,
      shipped: req.body.shipped,
      trackNumber: req.body.trackNumber,
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
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}
/**
 * Delete un user : 
 * delete http://localhost:3000/api/v1_1/user/6
 */
exports.destroy = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}

/**
 * Get All data from order : 
 * Get http://localhost:3000/api/v1_1/order/$id/all
 */
 exports.getAllFromOrder = async (req, res) => {
  console.log("Get all from Order" + req.params.id)
  try {
    await Order.findByPk(req.params.id).then(async (orderById) => {
      if (orderById) {
        await Order.findAll({
          include: [{
            model: db.user,
            required: true,
          }, {
            model: db.shop,
            required: true
          }]
        }).then((r) => {
          if (r) res.status(200).json(r);
          else res.status(404).error();
        })
      }
      else res.status(404).end();

    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}