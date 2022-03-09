const db = require("../../../models");
const OrderDetails = db.orderDetails;
//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */
/**
 */
exports.findAll = async (req, res) => {
  console.log("OrderDetails ALL")
  await OrderDetails.findAll().then((r) => res.json(r));
};
/**
 */
exports.findByPk = async (req, res) => {
  console.log("OrderDetails BY ID " + req.params.id)
  await OrderDetails.findByPk(req.params.id).then((r) => {
    if (r) res.json(r);
    else res.status(404).end();
  });
}
/**
 */
exports.create = async (req, res) => {
  console.log("CREATE OrderDetails")
  await OrderDetails.create({
    name: req.body.name,
    duration: req.body.duration,
    ArtistId: req.body.userId
  }).then((r) =>
    res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
  );
}
/**
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
    console.log(error)
  }
}
/**
 * Delete un user : 
 * delete http://localhost:3000/api/v1_1/user/6
 */
exports.destroy = async (req, res) => {
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
}
