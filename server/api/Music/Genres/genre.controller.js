const db = require("../../../models");
const Genre = db.genre;
//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */
/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/user
 */
exports.findAll = async (req, res) => {
  try {
    console.log("Genre ALL")
    await Genre.findAll().then((r) => res.json(r));
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
};
/**
 * Buscar un user: 
 * http://localhost:3000/api/v1_1/user/1
 */
exports.findByPk = async (req, res) => {
  try {
    console.log("Genre BY ID " + req.params.id)
    await Genre.findByPk(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}
/**
 * crear un genre nuevo: 
 * POST http://localhost:3000/api/v1_1/user/
 */
exports.create = async (req, res) => {
  try {
    console.log("CREATE Genre")
    await Genre.create({
      name: req.body.name
    }).then((r) =>{
    if(r)
      res.status(201).json(r)
    else
    res.status(404).json({ "status": "not created" });
      
    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}
/**
 * Actualizar un user: 
 * PUT http://localhost:3000/api/v1_1/user/5
 */
exports.update = async (req, res) => {
  try {
    let values = {
      name: req.body.name,
    }
    let selector = {
      where: { id: req.params.id }
    };
    Genre.findByPk(req.params.id).then(async (genre) => {
      console.log(genre)
      if (genre) {
        await Genre.update(values, selector).then((r) => {
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
    await Genre.destroy({
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
