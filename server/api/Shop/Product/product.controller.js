const { productCategory } = require("../../../models");
const db = require("../../../models");
const Product = db.product;
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
    console.log("Product ALL")
    await Product.findAll().then((r) => res.json(r));
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
};
/**
 */
exports.findByPk = async (req, res) => {
  try {
    console.log("Product BY ID " + req.params.id)
    await Product.findByPk(req.params.id).then((r) => {
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
    console.log("CREATE Product")
    await Product.create({
      name: req.body.name,
      duration: req.body.duration,
      ShopId: req.body.ShopId
    }
    ).then(async (product) => {
      if (req.body.category) {
        await req.body.category.forEach(element => {
          product.addProductCategory(element[0], element[1]).then(async (category) => {
            console.log(category)
          })
        });
      }
      else console.log("not category")
      res.status(201).json(product)
    }
    );
  }
  catch (error) {
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
    Product.findByPk(req.params.id).then(async (product) => {
      console.log(product)
      if (product) {
        await Product.update(values, selector).then((r) => {
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
    await Product.destroy({
      where: {
        id: req.params.id
      }
    }).then((r) => {
      if (r)
        res.status(200).json({ "status": "Succesfully" });
      else
        res.status(404).json({ "status": "Error" });
    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}
/**
 * Product add category : 
 * post category http://localhost:3000/api/v1_1/user/6
 */
exports.getCategoriesFromProduct = async (req, res) => {
  try {
    console.log("addCategory to product " + req.params.id)
    await Product.findByPk(req.params.id).then(async (product) => {
      if (product) {
        await product.getProductCategories().then(async (product) => {
          if (product) { res.status(200).json(product) }
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
 * Get all data from product: 
 * post category http://localhost:3000/api/v1_1/user/6
 */
exports.getProductAndCategories = async (req, res) => {
  try {
    console.log("addCategory to product " + req.params.id)
    await Product.findByPk(req.params.id).then(async (product) => {
      if (product) {
        await Product.findAll({
          include: [{
            model: db.productCategory,
            where: {
              id: product.id
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
 * Get all data from product: 
 * post category http://localhost:3000/api/v1_1/user/6
 */
exports.getAllFromProduct = async (req, res) => {
  try {
    console.log("addCategory to product " + req.params.id)
    await Product.findByPk(req.params.id).then(async (product) => {
      if (product) {
        await Product.findAll({
          include: [{
            model: db.productCategory,
            where: {
              id: product.id
            },
            required: true
          }, {
            model: db.review,
            where: {
              id: product.id
            },
            required: true
          }, {
            model: db.faq,
            where: {
              id: product.id
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
 * 
 * Get FAQs from user : 
 * Get http://localhost:3000/api/v1_1/user/$id/faq
 */
exports.getReviews = async (req, res) => {
  console.log("Get reviews from product" + req.params.id)
  try {
    await Product.findByPk(req.params.id).then(async (foundById) => {
      if (foundById) {
        reviews = await foundById.getReviews().then((r) => {
          if (r) res.status(200).json(r);
          else res.status(404).json({ "status": "reviews not found" });

        })
      }
      else res.status(404).json({ "status": "product not found" }).end();

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
exports.getFaqs = async (req, res) => {
  console.log("Get faqs from product" + req.params.id)
  try {
    await Product.findByPk(req.params.id).then(async (foundById) => {
      if (foundById) {
        faqs = await foundById.getFaqs().then((r) => {
          if (r) res.status(200).json(r);
          else res.status(404).json({ "status": "reviews not found" });

        })
      }
      else res.status(404).json({ "status": "faqs not found" }).end();

    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}