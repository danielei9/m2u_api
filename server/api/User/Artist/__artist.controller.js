const ArtistLogic = require("./__artist.logic");

//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */

/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/artist
 */
exports.findAll = async (req, res) => {
  console.log("ARTIST ALL")
  res.status(201)
  try {
    console.log("ALL ARTIST LOGIC")
    return await Artist.findAll();
} catch (error) {
    console.log(error)
    return error.message 
}

  ArtistLogic.findAll().then((r) => {
    if (r)
      res.status(200).json(r)
    else res.status(404)
  });};

/**
 * Buscar un artist: 
 * http://localhost:3000/api/v1_1/artist/1
 */
exports.findByPk = async (req, res) => {
  console.log("ARTIST BY ID " + req.params.id)

  ArtistLogic.findByPk(req.params.id).then((r) => {
    if (r) res.status(200).json(r)
    else res.status(404).end();
  });
}

/**
 * crear un artist nuevo: 
 * POST http://localhost:3000/api/v1_1/artist/
 */
exports.create = async (req, res) => {
  console.log("CREATE ARTIST")
  ArtistLogic.create(req.body).then((r) => {
    if (r)
      res.status(201).json(r)
    else
      res.status(404).json(r)
  })
}

/**
 * Actualizar un artist: 
 * PUT http://localhost:3000/api/v1_1/artist/5
 */
exports.update = async (req, res) => {
  // console.log(req.body)
  console.log("UPDATE Artist")
 
   ArtistLogic.update(req.body, req.params.id).then((r) => {
     if (r) {
       console.log(r)
       res.status(200).json({ "status": "Succesfully" });
     }
     else
       res.status(404).json({ "status": "Error" });
   })
 }
 

/**
 * Delete un artist : 
 * delete http://localhost:3000/api/v1_1/artist/6
 */
exports.destroy = async (req, res) => {
  console.log("destroy Artist")

  ArtistLogic.destroy(req.params.id).then((r) => {
    if (r)
      res.status(200).json('ok');
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
