const db = require("../../../models");
const Faq = db.faq;
//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */
/**
 */
exports.findAll = async (req, res) => {
  try {
    console.log("Faq ALL")
    await Faq.findAll().then((r) => res.json(r));
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
};
/**
 */
exports.findByPk = async (req, res) => {
  try {
    console.log("Faq BY ID " + req.params.id)
    await Faq.findByPk(req.params.id).then((r) => {
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

    console.log("CREATE Faq")
    await Faq.create({
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
    Faq.findByPk(req.params.id).then(async (faq) => {
      console.log(faq)
      if (faq) {
        await Faq.update(values, selector).then((r) => {
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
    await Faq.destroy({
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
