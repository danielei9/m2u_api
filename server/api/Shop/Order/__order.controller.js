const db = require("../../../models");
const OrderLogic = require("./order.logic");
var bcrypt = require("bcryptjs");

//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */

/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/order
 */
exports.findAll = async (req, res) => {
  console.log("ORDERS ALL CONTROLLER")
  OrderLogic.findAll().then((r) => {
    if (r)
      res.status(200).json(r)
    else res.status(404)
  });
};

/**
 * Buscar un order: 
 * http://localhost:3000/api/v1_1/order/1
 * 
 */
exports.findByPk = async (req, res) => {
  console.log("ORDERS CONTROLLER BY ID " + req.params.id)
  OrderLogic.findByPk(req.params.id).then((r) => {
    if (r) res.json(r);
    else res.status(404).end();
  });

}

/**
 * crear un order nuevo: 
 * POST http://localhost:3000/api/v1_1/order/
 *  */
exports.create = async (req, res) => {
  console.log("CREATE ORDER CONTROLLER")
  OrderLogic.create(req.body).then((r) =>
    res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
  );
}

/**
 * Actualizar un order: 
 * PUT http://localhost:3000/api/v1_1/order/5
 */
exports.update = async (req, res) => {
  console.log("UPDATE ORDER")
  let id = req.params.id
  OrderLogic.update(req.body, id).then((r) => {
    if (r) {
      console.log(r)
      res.status(200).json({ "status": "Succesfully" });
    }
    else
      res.status(404).json({ "status": "Error" });
  })
}

/**
 * Delete un order : 
 * delete http://localhost:3000/api/v1_1/order/6
 */
exports.destroy = async (req, res) => {
  console.log("Destoy ORDER CONTROLLER")
  OrderLogic.destroy(req.params.id).then((r) => {
    if (r)
      res.status(200).json('ok');
    else
      res.status(404).json({ "status": "Error" });
  }
  )
}
