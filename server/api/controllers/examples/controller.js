import ExamplesService from '../../services/examples.service.js';

export class Controller {
  all(req, res) {
    console.log("All")

    ExamplesService.all().then((r) => res.json(r));
  }

  byId(req, res) {
    Role.byId(req.params.id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req, res) {
    console.log("create")
    Role.create("").then((r) =>
      res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
    );
  }
}
export default new Controller();
