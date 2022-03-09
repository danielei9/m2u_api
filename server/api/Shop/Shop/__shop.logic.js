
const db = require("../../../models");
const Shop = db.shop;

//********************************************* */
//******************** LOGICA  ******************* */
//********************************************* */

exports.findAll = async function () {
    try {
        console.log("ALL SHOP LOGIC")
        return await Shop.findAll();
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

exports.findByPk = async function (id) {
    try {
        console.log("FIND BY PK SHOP LOGIC")
        return await Shop.findByPk(id);
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

/**
 * crear un shop nuevo: 
 * POST http://localhost:3000/api/v1_1/shop/
 * 
 */
exports.create = async function (payload) {
    console.log("CREATE SHOP LOGIC")
    try {
        return await Shop.create({
            biography: payload.biography,
            shopName: payload.shopName,
            UserId: payload.UserId,
        })
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

/**
 * Actualizar un shop: 
 * PUT http://localhost:3000/api/v1_1/shop/5
 * 
 */
exports.update = async function (payload, id) {
    console.log("UPDATE SHOP LOGIC")
    let selector = {
        where: { id: id }
    };

    let values = {
        biography: payload.biography,
        shopName: payload.shopName,
        UserId: payload.UserId,
    }
    try {
        return await Shop.findByPk(id).then(async (shop) => {
            // console.log(shop)
            if (shop)
                return await Shop.update(values, selector)
        });
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

/**
 * Delete un shop : 
 * delete http://localhost:3000/api/v1_1/shop/6
 */
exports.destroy = async function (id) {
    return await Shop.destroy({ where: { id: id } })
}