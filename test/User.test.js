
const chai = require("chai");
const request = require("supertest");
const app = require("../server/index");

const expect = chai.expect;

describe('USER', () => {
  var idUser = ""
  let payload =
  {
    "username": "test",
    "email": "test",
    "pswd": "test",
    "name": "test",
    "surname": "test",
    "artist_name": "test",
    "phone": "test"
  }
  /**
   * Add a new user to the DB
   * Prueba 201 
   * prueba pswd hash not empty
   * property username =  "test"
   */
  it('1. - CREATE A NEW USER TEST', () =>
    request(app)
      .post('/api/v1_1/user')
      .send(payload)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).to.be.an.an('object').that.has.property('username').equal('test');
        expect(res.statusCode).to.equal(201);
        expect(res.body.pswd).not.empty;
      }));
  /**
    * Get all user
    */
  it('2. - GET ALL USERS TEST', () =>
    request(app)
      .get('/api/v1_1/user')
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).to.be.an.an('array');
        expect(res.body[0]).not.empty;
        idUser = res.body[0].id;
      }));

  /**
    * Get  user by :id
    */
  it('3. - GET USER BY ID TEST', () =>
    request(app)
      .get('/api/v1_1/user/' + idUser)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body)
          .to.be.an.an('object')
          .that.has.property('username')
          .equal('test');
      }));

  /**
    * Update user by :id
    */
  let payload2 =
  {
    username: "111",
    email: "111",
    pswd: "test",
    name: "test",
    surname: "test",
    artist_name: "test",
    phone: "test"
  }
  it('4. - UPDATE USER BY ID TEST', () => {
    request(app)
      .put("/api/posts/" + payload2.id)
      .send(payload2)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.id).toBe(payload2.id)
        expect(response.body.email).toBe(payload2.email)

        // Check the data in the database
        const userFind = await User.findOne({ id: idUser })
        expect(userFind).toBeTruthy()
        expect(userFind.body.id).toBe(payload2.id)
        expect(userFind.body.email).toBe(payload2.email)
      })
  })
  /**
      * Delete user by :id
      */
  it('5. - DELETE USER BY ID TEST', () =>
    request(app)
      .delete('/api/v1_1/user/' + idUser)
      //.expect('Content-Type', /json/)
      .then((res) => {
        console.log(res.body)
        expect(200)
      }));
  it('6. - FIND DELETED USER', () =>
    request(app)
      .get('/api/v1_1/user/' + idUser)
      .then((res) => {
        expect(404)
      }));
   
});