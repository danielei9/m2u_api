
const db = require("../../../models");
const Product = db.product;

//********************************************* */
//******************** LOGICA  ******************* */
//********************************************* */

exports.findAll = async function () {
    try {
        console.log("ALL PRODUCT LOGIC")
        return await Product.findAll();
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

exports.findByPk = async function (id) {
    try {
        console.log("FIND BY PK PRODUCT LOGIC")
        return await Product.findByPk(id);
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

/**
 * crear un product nuevo: 
 * POST http://localhost:3000/api/v1_1/product/
 * 
 */
exports.create = async function (payload) {
    console.log("CREATE PRODUCT LOGIC")
    try {
        return await Product.create({
            biography: payload.biography,
            productName: payload.productName,
            UserId: payload.UserId,
        })
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

/**
 * Actualizar un product: 
 * PUT http://localhost:3000/api/v1_1/product/5
 * 
 */
exports.update = async function (payload, id) {
    console.log("UPDATE PRODUCT LOGIC")
    let selector = {
        where: { id: id }
    };

    let values = {
        biography: payload.biography,
        productName: payload.productName,
        UserId: payload.UserId,
    }
    try {
        return await Product.findByPk(id).then(async (product) => {
            // console.log(product)
            if (product)
                return await Product.update(values, selector)
        });
    } catch (error) {
        console.log(error)
        return error.message 
    }
}

/**
 * Delete un product : 
 * delete http://localhost:3000/api/v1_1/product/6
 */
exports.destroy = async function (id) {
    return await Product.destroy({ where: { id: id } })
}