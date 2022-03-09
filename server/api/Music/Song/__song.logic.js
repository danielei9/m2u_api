
const db = require("../../../models");
const Song = db.song;

//********************************************* */
//******************** LOGICA  ******************* */
//********************************************* */

exports.findAll = async function () {
    try {
        console.log("ALL SONG LOGIC")
        return await Song.findAll();
    } catch (error) {
        console.log(error.message )
        return error.message 
    }
}

exports.findByPk = async function (id) {
    try {
        console.log("FIND BY PK SONG LOGIC")
        return await Song.findByPk(id);
    } catch (error) {
        console.log(error.message )
        return error.message 
    }
}

/**
 * crear un song nuevo: 
 * POST http://localhost:3000/api/v1_1/song/
 */
exports.create = async function (payload) {
    console.log("CREATE USER LOGIC")
    try {
        return await Song.create({
            name: payload.name,
            duration: payload.duration,
            DiskId: payload.DiskId,
            ArtistId: payload.ArtistId,
        })
    } catch (error) {
        console.log(error.message )
        return error.message 
    }
}

/**
 * Actualizar un song: 
 * PUT http://localhost:3000/api/v1_1/song/5
 * 
 */
exports.update = async function (payload, id) {
    console.log("CREATE USER LOGIC")
    let selector = {
        where: { id: id }
    };

    let values = {
        name: payload.name,
        duration: payload.duration
    }
    try {
        return await Song.findByPk(id).then(async (song) => {
            // console.log(song)
            if (song)
                return await Song.update(values, selector)
        });
    } catch (error) {
        console.log(error.message )
        return error.message
    }
}

/**
 * Delete un song : 
 * delete http://localhost:3000/api/v1_1/song/6
 */
exports.destroy = async function (id) {
    return await Song.destroy({ where: { id: id } })
}