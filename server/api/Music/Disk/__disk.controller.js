var bcrypt = require("bcryptjs");
//const DiskLogic = require("./disk.logic");

//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */

/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/disk
 */

exports.findAll = async (req, res) => {
  console.log("DISK ALL")
  res.status(201)
  DiskLogic.findAll().then((r) => {
    if (r)
      res.status(200).json(r)
    else res.status(404)
  });};

/**
 * Buscar un disk: 
 * http://localhost:3000/api/v1_1/disk/1
 */
exports.findByPk = async (req, res) => {
  console.log("Disk BY ID " + req.params.id)
  DiskLogic.findByPk(req.params.id).then((r) => {
    if (r) res.status(200).json(r)
    else res.status(404).end();
  });
}

/**
 * crear un disk nuevo: 
 * POST http://localhost:3000/api/v1_1/disk/
 */
exports.create = async (req, res) => {
  console.log("CREATE Disk")
  DiskLogic.create(req.body).then((r) => {
    if (r)
      res.status(201).json(r)
    else
      res.status(404).json(r)
  })
}

/**
 * Actualizar un disk: 
 * PUT http://localhost:3000/api/v1_1/disk/5
 */
exports.update = async (req, res) => {
  console.log("UPDATE Disk")
  DiskLogic.update(req.body, req.params.id).then((r) => {
    if (r) {
      console.log(r)
      res.status(200).json({ "status": "Succesfully" });
    }
    else
      res.status(404).json({ "status": "Error" });
  })
}
/**
 * Delete un disk : 
 * delete http://localhost:3000/api/v1_1/disk/6
 */
exports.destroy = async (req, res) => {
  console.log("Destoy DISK CONTROLLER")
  DiskLogic.destroy(req.params.id).then((r) => {
    if (r)
      res.status(200).json('ok');
    else
      res.status(404).json({ "status": "Error" });
  })
}

/**
 * getAllSongsFromDisk : 
 * get http://localhost:3000/api/v1_1/getAllSongsFromDisk/6
 */
 exports.getAllSongsFromDisk = async (req, res) => {
  DiskLogic.findAll({ include: Task }).then((r) => {
    if (r)
      res.status(200).json();
    else
      res.status(404).json({ "status": "Error" });
  })
}