const { song } = require("../../../models");
const db = require("../../../models");
const Song = db.song;
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
    console.log("Song ALL")
    await Song.findAll().then((r) => res.json(r));
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
  try {
    console.log("Song BY ID " + req.params.id)
    await Song.findByPk(req.params.id).then((r) => {
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
  try {
    console.log("CREATE Song")
     await Song.create({
      name: req.body.name,
      duration: req.body.duration,
      DiskId: req.body.DiskId,
      //Genres: req.body.genres //  [] Para crear Genres a la vez que creas un song Nosotros lo queremos predefinido
    }).then(async (song) => {
      if (song){
        await song.addGenres(req.body.GenresId).then(async (genre) => {
          console.log(genre)
        })
        res.status(201).json(song)
      }
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
      name: req.body.name,
      duration: req.body.duration
    }
    let selector = {
      where: { id: req.params.id }
    };
    Song.findByPk(req.params.id).then(async (song) => {
      console.log(song)
      if (song) {
        await Song.update(values, selector).then((r) => {
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
    await Song.destroy({
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
 * Delete un user : 
 * delete http://localhost:3000/api/v1_1/user/6
 */
exports.getGenres = async (req, res) => {
  console.log("Get genres from song" + req.params.id)
  try {
    await Song.findByPk(req.params.id).then(async (songByID) => {
      if (songByID) {
        orders = await songByID.getGenres().then((r) => {
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

exports.getAllFromSong = async (req, res) => {
  try {
    console.log("Song BY ID " + req.params.id)
    await Song.findByPk(req.params.id).then(async (SongById) => {
      if (SongById) {
        await Song.findAll({include:[{
          model:db.genre
        }]}).then(async (r) => {
          res.json(r);
        })
      }
      else res.status(404).end();
    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}
