const db = require("../../../models");
const Comment = db.comment;

//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */

/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/comment
 * [
 *   {
 *       "id": 1,
 *       "commentname": "123",
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
  console.log("Comment ALL CONTROLLER")
  try {
    await Comment.findAll().then(r => { if (r) res.json(r) })
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
};

/**
 * Buscar un comment: 
 * http://localhost:3000/api/v1_1/comment/1
 * 
 * 
 *    {
 *        "id": 1,
 *        "commentname": "123",
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
  console.log("Comment CONTROLLER BY ID " + req.params.id)
  try {
    await Comment.findByPk(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}

/**
 * crear un comment nuevo: 
 * POST http://localhost:3000/api/v1_1/comment/
 * 
 *   {
 *       "commentname": "123",
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
    await Comment.create({
      text: req.body.text,
      PostId: req.body.PostId,
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
 * Actualizar un comment: 
 * PUT http://localhost:3000/api/v1_1/comment/5
 * 
 *{
 *       "commentname": "123",
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
    text: req.body.text,
    text: req.body.idUser //o nombre del user o ambas TODO:
  }
  let selector = {
    where: { id: req.params.id }
  };
  try {
    return await Comment.findByPk(req.params.id).then(async (comment) => {
      console.log(comment)
      if (comment) {
        await Comment.update(values, selector).then((r) => {
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
 * Delete un comment : 
 * delete http://localhost:3000/api/v1_1/comment/6
 */
exports.destroy = async function (req, res) {
  try {
    await Comment.destroy({
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
