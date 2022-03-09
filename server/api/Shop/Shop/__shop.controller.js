const ShopLogic = require("./shop.logic");

//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */

/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/shop
 */
exports.findAll = async (req, res) => {
  console.log("SHOP ALL")
  res.status(201)
  ShopLogic.findAll().then((r) => {
    if (r)
      res.status(200).json(r)
    else res.status(404)
  });};

/**
 * Buscar un shop: 
 * http://localhost:3000/api/v1_1/shop/1
 */
exports.findByPk = async (req, res) => {
  console.log("SHOP BY ID " + req.params.id)

  ShopLogic.findByPk(req.params.id).then((r) => {
    if (r) res.status(200).json(r)
    else res.status(404).end();
  });
}

/**
 * crear un shop nuevo: 
 * POST http://localhost:3000/api/v1_1/shop/
 */
exports.create = async (req, res) => {
  console.log("CREATE SHOP")
  ShopLogic.create(req.body).then((r) => {
    if (r)
      res.status(201).json(r)
    else
      res.status(404).json(r)
  })
}

/**
 * Actualizar un shop: 
 * PUT http://localhost:3000/api/v1_1/shop/5
 */
exports.update = async (req, res) => {
  // console.log(req.body)
  console.log("UPDATE Artist")
 
   ShopLogic.update(req.body, req.params.id).then((r) => {
     if (r) {
       console.log(r)
       res.status(200).json({ "status": "Succesfully" });
     }
     else
       res.status(404).json({ "status": "Error" });
   })
 }
 

/**
 * Delete un shop : 
 * delete http://localhost:3000/api/v1_1/shop/6
 */
exports.destroy = async (req, res) => {
  console.log("destroy Artist")

  ShopLogic.destroy(req.params.id).then((r) => {
    if (r)
      res.status(200).json('ok');
    else
      res.status(404).json({ "status": "Error" });
  })
}
