
const chai = require("chai");
const request = require("supertest");
const app = require("../server/index");

const expect = chai.expect;

describe('Artist', () => {
  var idArtist = ""
  let payload =
  {
    biography: "test",
    artistName: "test",
    UserId: 2
  }
  let payloadUser =
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
  it('0. - CREATE A NEW USER TEST', () =>
  request(app)
    .post('/api/v1_1/user')
    .send(payloadUser)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body).to.be.an.an('object').that.has.property('username').equal('test');
      expect(res.statusCode).to.equal(201);
      expect(res.body.pswd).not.empty;
    }));
  it('1. - CREATE A NEW Artist TEST', () =>{
    request(app)
      .post('/api/v1_1/artist')
      .send(payload)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).to.be.an.an('object').that.has.property('artistName').equal('test');
        expect(res.statusCode).to.equal(201);
        expect(res.body.UserId).not.empty;
      })
    });
  /**
    * Get all user
    */
  it('2. - GET ALL Artist TEST', () =>
    request(app)
      .get('/api/v1_1/artist')
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).to.be.an.an('array');
        expect(res.body[0]).not.empty;
        idArtist = res.body[0].id;
      }));

  /**
    * Get  user by :id
    */
  it('3. - GET Artuist BY ID TEST', () =>
    request(app)
      .get('/api/v1_1/artist/' + idArtist)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body)
          .to.be.an.an('object')
          .that.has.property('artistName')
          .equal('test');
      }));

  /**
    * Update user by :id
    */
  it('4. - UPDATE Artis BY ID TEST', () => {
    payload.artistName = 'PUT_TEST';

    request(app)
      .put("/api/posts/" + idArtist)
      .send(payload)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.artistName).toBe(payload.artistName)

        // Check the data in the database
        const userFind =  Artist.findOne({ id: idArtist })
        expect(userFind).toBeTruthy()
        expect(userFind.body.id).toBe(idArtist)
        expect(userFind.body.artistName).toBe(payload.artistName)
      })
  })
  /**
      * Delete artist by :id
      */
  it('5. - DELETE Artist BY ID TEST', () =>
    request(app)
      .delete('/api/v1_1/artist/' + idArtist)
      //.expect('Content-Type', /json/)
      .then((res) => {
        console.log(res.body)
        expect(200)
      }));
});