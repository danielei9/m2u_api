const db = require("../../models");
const Blog = db.blog;

//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */

/**
 * Buscar todos: 
 * localhost:3000/api/v1_1/blog
 * [
 *   {
 *       "id": 1,
 *       "blogname": "123",
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
  console.log("BLOG ALL CONTROLLER")
  try {
    await Blog.findAll().then(r => { if (r) res.json(r) })
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
};

/**
 * Buscar un blog: 
 * http://localhost:3000/api/v1_1/blog/1
 * 
 * 
 *    {
 *        "id": 1,
 *        "blogname": "123",
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
  console.log("BLOG CONTROLLER BY ID " + req.params.id)
  try {
    await Blog.findByPk(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "status": error.message });
  }
}

/**
 * crear un blog nuevo: 
 * POST http://localhost:3000/api/v1_1/blog/
 * 
 *   {
 *       "blogname": "123",
 *       "name": "Daniel",
 *       "surname": "Burruchaga",
 *       "artist_name": "BV",
 *       "phone": "678098745",
 *       "email": "123",
 *       "pswd": "1",
 *  }
 */
exports.create = async (req, res) => {
  console.log("CREATE BLOG CONTROLLER")
  try {
     await Blog.create({
      name: req.body.name,
      description: req.body.description,
      content: req.body.content,
      UserId: req.body.UserId
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
 * Actualizar un blog: 
 * PUT http://localhost:3000/api/v1_1/blog/5
 * 
 *{
 *       "blogname": "123",
 *       "name": "Daniel",
 *       "surname": "Burruchaga",
 *       "artist_name": "BV",
 *       "phone": "678098745",
 *       "email": "123",
 *       "pswd": "1",
 *  }
 */
exports.update = async (req, res) => {
  console.log("UPDATE BLOG")
  let values = {
    name: req.body.name,
    description: req.body.description,
    content: req.body.content,
    UserId: req.body.UserId
  }
  let selector = {
    where: { id: req.params.id }
  };
  try {
    return await Blog.findByPk(req.params.id).then(async (blog) => {
      console.log(blog)
      if (blog) {
        await Blog.update(values, selector).then((r) => {
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
 * Delete un blog : 
 * delete http://localhost:3000/api/v1_1/blog/6
 */
exports.destroy = async function (req, res) {
  try {
    await Blog.destroy({
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
 * Get posts from blog : 
 * Get http://localhost:3000/api/v1_1/blog/$id/blog
 */
 exports.getPosts = async (req, res) => {
  console.log("Get Posts from Blog" + req.params.id)
  try {
    await Blog.findByPk(req.params.id).then(async(blogById) => {
      if (blogById) {
        posts = await blogById.getPosts().then((r) => {
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
/**
 * Get all from blog : 
 * Get http://localhost:3000/api/v1_1/blog/$id/all
 */
 exports.getAllFromBlog = async (req, res) => {
  try {
    console.log("Blog BY ID " + req.params.id)
    await Blog.findByPk(req.params.id).then(async (blogById) => {
      if (blogById) {
        await Blog.findAll({include:[{
          model:db.post,
          where: {
            BlogId: blogById.id
          },
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


