
const db = require("../../../models");
const Disk = db.disk;

//********************************************* */
//******************** LOGICA  ******************* */
//********************************************* */

exports.findAll = async function () {
    try {
        console.log("ALL DISK LOGIC")
        return await Disk.findAll();
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

exports.findByPk = async function (id) {
    try {
        console.log("FIND BY PK DISK LOGIC")
        return await Disk.findByPk(id);
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

/**
 * crear un disk nuevo: 
 * POST http://localhost:3000/api/v1_1/disk/
 * 
 */
exports.create = async function (payload) {
    console.log("CREATE DISK LOGIC")
    try {
        return await Disk.create({
            name: payload.name,
            year: payload.year,
            ArtistId: payload.ArtistId
        })
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

/**
 * Actualizar un disk: 
 * PUT http://localhost:3000/api/v1_1/disk/5
 * 
 */
exports.update = async function (payload, id) {
    console.log("CREATE DISK LOGIC")
    let selector = {
        where: { id: id }
    };

    let values ={
        name: payload.name,
        year: payload.year,
        ArtistId: payload.ArtistId
    }
    try {
        return await Disk.findByPk(id).then(async (disk) => {
            // console.log(disk)
            if (disk)
                return await Disk.update(values, selector)
        });
    } catch (error) {
        console.log(error)
    }
}

/**
 * Delete un disk : 
 * delete http://localhost:3000/api/v1_1/disk/6
 */
exports.destroy = async function (id) {
    return await Disk.destroy({ where: { id: id } })
}