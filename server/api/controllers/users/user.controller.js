//********************************************* */
//******************** ACCESS ******************* */
//********************************************* */
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
//********************************************* */
//******************** CONTROLLER ******************* */
//********************************************* */
exports.all = (req, res) => {
  console.log("USERS ALL")
  res.status(201)
  //User.all().then((r) => res.json(r));
};
exports.byId = (req, res) => {
  User.byId(req.params.id).then((r) => {
    if (r) res.json(r);
    else res.status(404).end();
  });
}
exports.create = (req, res) => {
  console.log("CREATE USER")
  User.create(req.body.name).then((r) =>
    res.status(201).location(`/api/v1_1/examples/${r.id}`).json(r)
  );
}