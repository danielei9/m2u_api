
//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */
const db = require("../../../models");
const Artist = db.artist;

/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/artist
 */
exports.findAll = async (req, res) => {
  console.log("ARTIST ALL")
  try {
    return await Artist.findAll().then((r) => {
      if (r)
        res.status(200).json(r)
      else res.status(404)
    });
  }
  catch (error) {
    console.log(error)
    res.status(404).json({ "status": error.message });;
  }
}

/**
 * Buscar un artist: 
 * http://localhost:3000/api/v1_1/artist/1
 */
exports.findByPk = async (req, res) => {
  console.log("ARTIST BY ID " + req.params.id)
  try {
    console.log("FIND BY PK ARTIST LOGIC")
    return await Artist.findByPk(req.params.id).then((r) => {
      if (r) res.status(200).json(r)
      else res.status(404).end();
    });
  } catch (error) {
    console.log(error)
    res.status(404).json({ "status": error.message });;
  }
}

/**
 * crear un artist nuevo: 
 * POST http://localhost:3000/api/v1_1/artist/
 */
exports.create = async (req, res) => {
  console.log("CREATE ARTIST")
  try {
    return await Artist.create({
      biography: req.body.biography,
      artistName: req.body.artistName,
      UserId: req.body.UserId,
    }).then((r) => {
      if (r)
        res.status(201).json(r)
      else
        res.status(404).json(r)
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({ "status": error.message });;
  }
}

/**
 * Actualizar un artist: 
 * PUT http://localhost:3000/api/v1_1/artist/5
 */
exports.update = async (req, res) => {
  // console.log(req.body)
  console.log("UPDATE Artist")
  try {
    return await Artist.findByPk(id).then(async (artist) => {
      // console.log(artist)
      if (artist)
        await Artist.update(values, selector).then((r) => {
          if (r) {
            console.log(r)
            res.status(200).json({ "status": "Succesfully" });
          }
          else
            res.status(404).json({ "status": "Error" });
        })
    });
  } catch (error) {
    console.log(error)
    res.status(404).json({ "status": error.message });;
  }
}


/**
 * Delete un artist : 
 * delete http://localhost:3000/api/v1_1/artist/6
 */
exports.destroy = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error)
    res.status(404).json({ "status": error.message });;
  }
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
