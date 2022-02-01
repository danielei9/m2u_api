import * as Role from '../../../common/db/models/role.model.js'

export class Controller {
  all(req, res) {
    console.log("ROLE ALL");

    Role.all().then((r) => res.json(r));
    res.status(201).json(r)
  }

  byId(req, res) {
    /*
    ExamplesService.byId(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });*/
    console.log("ROLE byid")

  }

  create(req, res) {
    /*ExamplesService.create(req.body.name).then((r) =>
      res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
    );*/
  }
}
export default new Controller();
