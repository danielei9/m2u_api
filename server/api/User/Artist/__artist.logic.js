
const db = require("../../../models");
const Artist = db.artist;

//********************************************* */
//******************** LOGICA  ******************* */
//********************************************* */

exports.findAll = async function () {
    try {
        console.log("ALL ARTIST LOGIC")
        return await Artist.findAll();
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

exports.findByPk = async function (id) {
    try {
        console.log("FIND BY PK ARTIST LOGIC")
        return await Artist.findByPk(id);
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

/**
 * crear un artist nuevo: 
 * POST http://localhost:3000/api/v1_1/artist/
 * 
 */
exports.create = async function (payload) {
    console.log("CREATE ARTIST LOGIC")
    try {
        return await Artist.create({
            biography: payload.biography,
            artistName: payload.artistName,
            UserId: payload.UserId,
        })
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

/**
 * Actualizar un artist: 
 * PUT http://localhost:3000/api/v1_1/artist/5
 * 
 */
exports.update = async function (payload, id) {
    console.log("UPDATE ARTIST LOGIC")
    let selector = {
        where: { id: id }
    };

    let values = {
        biography: payload.biography,
        artistName: payload.artistName,
        UserId: payload.UserId,
    }
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
        return error.message 
    }
}

/**
 * Delete un artist : 
 * delete http://localhost:3000/api/v1_1/artist/6
 */
exports.destroy = async function (id) {
    return await Artist.destroy({ where: { id: id } })
}