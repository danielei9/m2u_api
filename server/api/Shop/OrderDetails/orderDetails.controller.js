const db = require("../../../models");
const OrderDetails = db.orderDetails;
//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */
/**
 */
exports.findAll = async (req, res) => {
  try {
    console.log("OrderDetails ALL")
    await OrderDetails.findAll().then((r) => res.json(r));
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
};
/**
 */
exports.findByPk = async (req, res) => {
  try {
    console.log("OrderDetails BY ID " + req.params.id)
    await OrderDetails.findByPk(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}
/**
 */
exports.create = async (req, res) => {
  try {
    console.log("CREATE OrderDetails")
    await OrderDetails.create({
      options: req.body.options,
      price: req.body.price,
      quantity: req.body.quantity,
      sku: req.body.sku,
      OrderId: req.body.OrderId,
      ProductId: req.body.ProductId
    }).then((r) =>
      res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
    );
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}
/**
 */
exports.update = async (req, res) => {
  try {
    let values = {
      options: req.body.options,
      price: req.body.price,
      quantity: req.body.quantity,
      sku: req.body.sku,
      OrderId: req.body.OrderId,
      ProductId: req.body.ProductId
    }
    let selector = {
      where: { id: req.params.id }
    };
    OrderDetails.findByPk(req.params.id).then(async (orderDetails) => {
      console.log(orderDetails)
      if (orderDetails) {
        await OrderDetails.update(values, selector).then((r) => {
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
 * Get all data from product: 
 * post category http://localhost:3000/api/v1_1/user/6
 */
exports.getAllFromOrderDetails = async (req, res) => {
  try {
    console.log("OrderDetails all data " + req.params.id)
    await OrderDetails.findByPk(req.params.id).then(async (foundById) => {
      if (foundById) {
        await OrderDetails.findAll({
          include: [{
            model: db.order,
            where: {
              id: foundById.OrderId
            },
            required: true
          }, {
            model: db.product,
            where: {
              id: foundById.ProductId
            },
            required: true
          }]
        }).then(async (categorys) => {
          res.status(200).send(categorys)
        })
      }
      else res.status(404).json({ "status": "Product Not Found" }).end();
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
    await OrderDetails.destroy({
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