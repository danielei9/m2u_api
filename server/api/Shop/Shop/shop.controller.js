const db = require("../../../models");
const Shop = db.shop;
//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */
/**
 */
exports.findAll = async (req, res) => {
  try {
    console.log("Shop ALL")
    await Shop.findAll().then((r) => res.json(r));
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
};
/**
 */
exports.findByPk = async (req, res) => {
  try {
    console.log("Shop BY ID " + req.params.id)
    await Shop.findByPk(req.params.id).then((r) => {
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
    console.log("CREATE Shop")
    await Shop.create({
      name: req.body.name,
      duration: req.body.duration,
      ArtistId: req.body.ArtistId
    }).then((r) =>
      res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
    );
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}
/**
 * 
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
    Shop.findByPk(req.params.id).then(async (shop) => {
      console.log(shop)
      if (shop) {
        await Shop.update(values, selector).then((r) => {
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
    await Shop.destroy({
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
 * Get FAQs from user : 
 * Get http://localhost:3000/api/v1_1/user/$id/faq
 */
 exports.getProducts = async (req, res) => {
  console.log("Get Products from user" + req.params.id)
  try {
    await Shop.findByPk(req.params.id).then(async (shopById) => {
      if (shopById) {
        products = await shopById.getProducts().then((r) => {
          if (r) res.status(200).json(r);
          else res.status(404).error();
        })
      }
      else res.status(404).end().json({ "status": "shop Not found " });

    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}
/**
 * 
 * Get FAQs from user : 
 * Get http://localhost:3000/api/v1_1/user/$id/faq
 */
 exports.getOrders = async (req, res) => {
  console.log("Get Orders from user" + req.params.id)
  try {
    await Shop.findByPk(req.params.id).then(async (shopById) => {
      if (shopById) {
        products = await shopById.getOrders().then((r) => {
          if (r) res.status(200).json(r);
          else res.status(404).error();
        })
      }
      else res.status(404).end().json({ "status": "shop Not found " });

    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}

/**
 * Get FAQs from user : 
 * Get http://localhost:3000/api/v1_1/user/$id/all
 */
 exports.getAllFromShop = async (req, res) => {
  console.log("Get all from Shop" + req.params.id)
  try {
    await Shop.findByPk(req.params.id).then(async (shopByID) => {
      if (shopByID) {
        await Shop.findAll({
          include: [{
            model: db.product,
            where: {
              ShopId: shopByID.id
            },
            required: true,
          }, {
            model: db.order,
            where: {
              ShopId: shopByID.id
            },
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