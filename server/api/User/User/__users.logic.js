
const db = require("../../../models");
const User = db.user;
var bcrypt = require("bcryptjs");

//********************************************* */
//******************** LOGICA  ******************* */
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
exports.findAll = async function () {
    try {
        console.log("ALL USER LOGIC")
        return await User.findAll();
    } catch (error) {
        console.log(error.message )
        return error.message 
    }
}

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
exports.findByPk = async function (id) {
    try {
        console.log("FIND BY PK USER LOGIC")
        return await User.findByPk(id);
    } catch (error) {
        console.log(error.message )
        return error.message 
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
exports.create = async function (payload) {
    console.log("CREATE USER LOGIC")
    try {
        return await User.create({
            username: payload.username,
            name: payload.name,
            surname: payload.surname,
            artist_name: payload.artist_name,
            phone: payload.phone,
            email: payload.email,
            pswd: await bcrypt.hashSync(payload.pswd, 8).toString()
        })
    } catch (error) {
        console.log(error.message )
        return error.message 
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
exports.update = async function (payload, id) {
    console.log("CREATE USER LOGIC")
    let selector = {
        where: { id: id }
    };
    try {
        return await User.findByPk(id).then(async (user) => {
            // console.log(user)
            if (user) 
                return await User.update(payload, selector)
        });
    } catch (error) {
        console.log(error.message )
        return error.message 

    }
}

/**
 * Delete un user : 
 * delete http://localhost:3000/api/v1_1/user/6
 */
 exports.destroy = async function (id) {
    return await User.destroy({where: { id: id}})
  }