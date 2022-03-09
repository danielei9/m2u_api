
const db = require("../../../models");
const Order = db.order;
var bcrypt = require("bcryptjs");

//********************************************* */
//******************** LOGICA  ******************* */
//********************************************* */
/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/order
 */
exports.findAll = async function () {
    try {
        console.log("ALL ORDER LOGIC")
        return await Order.findAll();
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

/**
 * Buscar un order: 
 * http://localhost:3000/api/v1_1/order/1*
 */
exports.findByPk = async function (id) {
    try {
        console.log("FIND BY PK ORDER LOGIC")
        return await Order.findByPk(id);
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

/**
 * crear un order nuevo: 
 * POST http://localhost:3000/api/v1_1/order/
 * 
 *  dateBuy: req.body.dateBuy,
    dateSend: req.body.dateSend,
    timeRecived: req.body.timeRecived,
    amount: req.body.amount,
    shipName: req.body.shipName,
    shipAddres: req.body.shipAddres,
    city: req.body.city,
    postalCode: req.body.postalCode,
    country: req.body.country,
    phone: req.body.phone,
    shippingCost: req.body.shippingCost,
    tax: req.body.tax,
    email: req.body.email,
    date: req.body.date,
    shipped: DataTypes.shipped,
    trackNumber: DataTypes.trackNumber
 */
exports.create = async function (payload) {
    console.log("CREATE ORDER LOGIC")
    try {
        return await Order.create(payload)
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

/**
 * Actualizar un order: 
 * PUT http://localhost:3000/api/v1_1/order/5
 * 
 */
exports.update = async function (payload, id) {
    console.log("CREATE ORDER LOGIC")
    let selector = {
        where: { id: id }
    };
    try {
        return await Order.findByPk(id).then(async (order) => {
            // console.log(order)
            if (order)
                return await Order.update(payload, selector)
        });
    } catch (error) {
        console.log(error.message)
        return error.message

    }
}

/**
 * Delete un order : 
 * delete http://localhost:3000/api/v1_1/order/6
 */
exports.destroy = async function (id) {
    return await Order.destroy({ where: { id: id } })
}