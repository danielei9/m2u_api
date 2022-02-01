import * as User from '../../../common/db/models/usuario.js'

export class Controller {
  all(req, res) {
    console.log("USERS ALL")
    res.status(201)

    //User.all().then((r) => res.json(r));
  }

  byId(req, res) {
    User.byId(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req, res) {
    console.log("CREATE USER")
    User.create(req.body.name).then((r) =>
      res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
    );
  }
  /**
   * AUTH USER
   */
   allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
}
export default new Controller();
