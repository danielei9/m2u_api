const db = require("../../../models");
const User = db.user;
var bcrypt = require("bcryptjs");
const { disk } = require("../../../models");

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
  console.log("ARTIST ALL")
  res.status(201)
  await Artist.findAll({include: disk}).then((r) => res.json(r));
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
  console.log("ARTIST BY ID " + req.params.id)

  await Artist.findByPk(req.params.id).then((r) => {
    if (r) res.json(r);
    else res.status(404).end();
  });
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
  console.log("CREATE ARTIST")
  await Artist.create({
    biography: req.body.biography,
    artistName: req.body.artistName
  }).then((r) =>
    res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
  );
}

/**
 * Actualizar un artist: 
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
  try {
    let values = {
      biography: req.body.biography,
      artistName: req.body.artistName
    }
    let selector = {
      where: { id: req.params.id }
    };
    Artist.findByPk(req.params.id).then(async (artist) => {
      console.log(artist)
      if (artist) {
        await Artist.update(values, selector).then((r) => {
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
  await Artist.destroy({
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

/**
 * getAllDiskFrom: 
 * Get all disk from one specific artist
 */
exports.getAllDiskFrom = async (req, res) => {
  const result = await Artist.findOne({
    where: { id: 1 },
    include: disk
  });
  res.status(200).json(result);
};
