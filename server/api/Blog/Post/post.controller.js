const db = require("../../../models");
const Post = db.post;

//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */

/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/post
 * [
 *   {
 *       "id": 1,
 *       "postname": "123",
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
  console.log("POSTS ALL CONTROLLER")
  try {
    await Post.findAll().then(r => { if (r) res.json(r) })
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
};

/**
 * Buscar un post: 
 * http://localhost:3000/api/v1_1/post/1
 * 
 * 
 *    {
 *        "id": 1,
 *        "postname": "123",
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
  console.log("POSTS CONTROLLER BY ID " + req.params.id)
  try {
    await Post.findByPk(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}

/**
 * crear un post nuevo: 
 * POST http://localhost:3000/api/v1_1/post/
 * 
 *   {
 *       "postname": "123",
 *       "name": "Daniel",
 *       "surname": "Burruchaga",
 *       "artist_name": "BV",
 *       "phone": "678098745",
 *       "email": "123",
 *       "pswd": "1",
 *  }
 */
exports.create = async (req, res) => {
  console.log("CREATE POST CONTROLLER")
  try {
    await Post.create({
      name: req.body.name,
      description: req.body.description,
      content: req.body.content,
      BlogId: req.body.BlogId,
      DiskId: req.body.DiskId

    }).then((r) => {
      if (r) res.status(201).json(r);
      else res.status(404).json(r).end();
    })
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}

/**
 * Actualizar un post: 
 * PUT http://localhost:3000/api/v1_1/post/5
 * 
 *{
 *       "postname": "123",
 *       "name": "Daniel",
 *       "surname": "Burruchaga",
 *       "artist_name": "BV",
 *       "phone": "678098745",
 *       "email": "123",
 *       "pswd": "1",
 *  }
 */
exports.update = async (req, res) => {
  console.log("UPDATE POST")
  let values = {
    name: "DataTypes.STRING",
    year: "DataTypes.STRING"
  }

  let selector = {
    where: { id: req.params.id }
  };
  try {
    return await Post.findByPk(req.params.id).then(async (post) => {
      console.log(post)
      if (post) {
        await Post.update(values, selector).then((r) => {
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
 * Delete un post : 
 * delete http://localhost:3000/api/v1_1/post/6
 */
exports.destroy = async function (req, res) {
  try {
    await Post.destroy({
      where: {
        id: req.params.id
      }
    }).then((r) => {
      if (r)
        res.status(200).json({ "status": "Succesfully" });
      else
        res.status(404).json({ "status": "Not Found" });
    })
  } catch (error) {
    console.error(error)
    res.status(404).json({ "status": error.message });
  }
}

/**
 * Get Comments from post : 
 * Get http://localhost:3000/api/v1_1/blog/$id/blog
 */
 exports.getComments = async (req, res) => {
  console.log("Get Posts from Blog" + req.params.id)
  try {
    await Post.findByPk(req.params.id).then(async(postById) => {
      if (postById) {
        comments = await postById.getComments().then((r) => {
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