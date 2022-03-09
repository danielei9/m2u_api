const ProductLogic = require("./Product.logic");

//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */

/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/Product
 */
exports.findAll = async (req, res) => {
  console.log("PRODUCT ALL")
  res.status(201)
  ProductLogic.findAll().then((r) => {
    if (r)
      res.status(200).json(r)
    else res.status(404)
  });};

/**
 * Buscar un Product: 
 * http://localhost:3000/api/v1_1/Product/1
 */
exports.findByPk = async (req, res) => {
  console.log("PRODUCT BY ID " + req.params.id)

  ProductLogic.findByPk(req.params.id).then((r) => {
    if (r) res.status(200).json(r)
    else res.status(404).end();
  });
}

/**
 * crear un Product nuevo: 
 * POST http://localhost:3000/api/v1_1/Product/
 */
exports.create = async (req, res) => {
  console.log("CREATE PRODUCT")
  ProductLogic.create(req.body).then((r) => {
    if (r)
      res.status(201).json(r)
    else
      res.status(404).json(r)
  })
}

/**
 * Actualizar un Product: 
 * PUT http://localhost:3000/api/v1_1/Product/5
 */
exports.update = async (req, res) => {
  // console.log(req.body)
  console.log("UPDATE Product")
 
   ProductLogic.update(req.body, req.params.id).then((r) => {
     if (r) {
       console.log(r)
       res.status(200).json({ "status": "Succesfully" });
     }
     else
       res.status(404).json({ "status": "Error" });
   })
 }
 

/**
 * Delete un Product : 
 * delete http://localhost:3000/api/v1_1/Product/6
 */
exports.destroy = async (req, res) => {
  console.log("destroy Product")

  ProductLogic.destroy(req.params.id).then((r) => {
    if (r)
      res.status(200).json('ok');
    else
      res.status(404).json({ "status": "Error" });
  })
}
