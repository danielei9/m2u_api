const SongLogic = require("./__song.logic");

//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */

/**
 * buscar all song : 
 * GET http://localhost:3000/api/v1_1/song/
 * 
 */
exports.findAll = async (req, res) => {
  console.log("CONTROLLER SONG ALL")
  res.status(201)
  SongLogic.findAll().then((r) => {
    if (r)
      res.status(200).json(r)
    else res.status(404)
  });
};

/**
 * buscar un song by id 
 * GET http://localhost:3000/api/v1_1/song/:id
 */
exports.findByPk = async (req, res) => {
  console.log("CONTROLLER SONG BY ID " + req.params.id)
  SongLogic.findByPk(req.params.id).then((r) => {
    if (r) res.status(200).json(r)
    else res.status(404).end();
  });
}

/**
 * crear un song nuevo: 
 * POST http://localhost:3000/api/v1_1/song/
 * 
 */
exports.create = async (req, res) => {
  console.log("CREATE SONG")
  SongLogic.create(req.body).then((r) => {
    if (r)
      res.status(201).json(r)
    else
      res.status(404).json(r)
  })
}

/**
 * Actualizar un song: 
 * PUT http://localhost:3000/api/v1_1/user/5
 * 
 */
exports.update = async (req, res) => {
 // console.log(req.body)
 console.log("UPDATE Song")

  SongLogic.update(req.body, req.params.id).then((r) => {
    if (r) {
      console.log(r)
      res.status(200).json({ "status": "Succesfully" });
    }
    else
      res.status(404).json({ "status": "Error" });
  })
}

/**
 * Delete un user : 
 * delete http://localhost:3000/api/v1_1/user/6
 */
exports.destroy = async (req, res) => {
  console.log("Destoy Song CONTROLLER")
  SongLogic.destroy(req.params.id).then((r) => {
    if (r)
      res.status(200).json('ok');
    else
      res.status(404).json({ "status": "Error" });
  })
}