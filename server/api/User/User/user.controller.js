const db = require("../../../models");
const { disk, artist } = require("../../../models");
const User = db.user;

//********************************************* */
//******************** ACCESS ******************* */
//********************************************* */
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
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
  console.log("USERS ALL CONTROLLER")
  /*const userTest = await User.findByPk(1)
  console.log("ARTIST++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log(await userTest.getArtists());*/


  try {
    await User.findAll().then(r => { if (r) res.json(r) })
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
  console.log("USERS CONTROLLER BY ID " + req.params.id)
  try {
    await User.findByPk(req.params.id).then((r) => {
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
  console.log("CREATE USER CONTROLLER")
  try {
    await User.create({
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      artist_name: req.body.artist_name,
      phone: req.body.phone,
      email: req.body.email,
      pswd: req.body.pswd
    }).then((r) => {
      if (r) res.status(201).json(r);
      else res.status(404).json(r).end();
    })
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
  console.log("UPDATE USER")
  let values = {
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    artist_name: req.body.artist_name,
    phone: req.body.phone,
    email: req.body.email,
    pswd: req.body.pswd
  }
  let selector = {
    where: { id: req.params.id }
  };
  try {
    return await User.findByPk(req.params.id).then(async (user) => {
      console.log(user)
      if (user) {
        await User.update(values, selector).then((r) => {
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
exports.destroy = async function (req, res) {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    }).then((r) => {
      if (r)
        res.status(200).json({ "status": "Succesfully" });
      else
        res.status(404).json({ "status": "Not Found" });
    })
  } catch (error) {
    console.error(error)
    res.status(404).json({ "status": error.message });
  }
}

/**
 * Get BLogs from user : 
 * Get http://localhost:3000/api/v1_1/user/$id/blog
 */
exports.getBlogs = async (req, res) => {
  console.log("get blogs from user " + req.params.id)
  try {
    await User.findByPk(req.params.id).then(async (userById) => {
      if (userById) {
        blogs = await userById.getBlogs().then((blogs) => {
          if (blogs) res.status(200).json(blogs);
          else res.status(404).end();
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
 * Get Artists from user : 
 * Get http://localhost:3000/api/v1_1/user/$id/artist
 */
exports.getArtists = async (req, res) => {
  console.log("Get Artist from user" + req.params.id)
  try {
    await User.findByPk(req.params.id).then(async (userById) => {
      if (userById) {
        artists = await userById.getArtists().then((r) => {
          if (r) res.status(200).json(r);
          else res.status(404).end();
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
 * Get Orders from user : 
 * Get http://localhost:3000/api/v1_1/user/$id/order
 */
exports.getOrders = async (req, res) => {
  console.log("Get Orders from user" + req.params.id)
  try {
    await User.findByPk(req.params.id).then(async (userById) => {
      if (userById) {
        orders = await userById.getOrders().then((r) => {
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


/**
 * Get FAQs from user : 
 * Get http://localhost:3000/api/v1_1/user/$id/faq
 */
exports.getFaqs = async (req, res) => {
  console.log("Get Faqs from user" + req.params.id)
  try {
    await User.findByPk(req.params.id).then(async (userById) => {
      if (userById) {
        orders = await userById.getFaqs().then((r) => {
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

/**
 * Get FAQs from user : 
 * Get http://localhost:3000/api/v1_1/user/$id/all
 */
exports.getAllFromUser = async (req, res) => {
  console.log("Get all from user" + req.params.id)
  try {
    await User.findByPk(req.params.id).then(async (userById) => {
      if (userById) {
        await User.findAll({
          include: [{
            model: db.artist,
            where: {
              UserId: userById.id
            },
            required: true,
          }, {
            model: db.blog,
            where: {
              UserId: userById.id
            },
            required: true
          }]
        }).then((r) => {
          if (r[0]) {
            res.status(200).json(r);
          }
          else {
            console.log("Not extra data in this User");
          }
          res.status(200).json(userById);
        })
      }
      else res.status(404).end();
    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}