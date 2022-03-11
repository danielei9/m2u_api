const db = require("../../../models");
const Promotion = db.promotion;
//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */
/**
 */
exports.findAll = async (req, res) => {
  try {
    console.log("Promotion ALL")
    await Promotion.findAll().then((r) => res.json(r));
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
};
/**
 */
exports.findByPk = async (req, res) => {
  try {
    console.log("Promotion BY ID " + req.params.id)
    await Promotion.findByPk(req.params.id).then((r) => {
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
    console.log("CREATE Promotion")
    await Promotion.create({
      name: req.body.name,
      duration: req.body.duration,
      ArtistId: req.body.userId
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
      name: req.body.name,
      duration: req.body.duration
    }
    let selector = {
      where: { id: req.params.id }
    };
    Promotion.findByPk(req.params.id).then(async (promotion) => {
      console.log(promotion)
      if (promotion) {
        await Promotion.update(values, selector).then((r) => {
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
    await Promotion.destroy({
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
