
const chai = require("chai");
const request = require("supertest");
const app = require("../server/index");

const expect = chai.expect;

describe('Auth', () => {
  var idUser = ""
  let payload = {
    username: "admin",
    email: "admin",
    pswd: "admin"
  }
  /**
   * Add a new user to the DB
   * Prueba 201 
   * prueba pswd hash not empty
   * property username =  "test"
   */
   it('1. - SIGNUP - add user', async ()  =>
    request(app)
      .post('/api/V1_1/auth/signup')
      .send(payload)
      .then((res) => {
        //expect(res.body.message).to.equal("User registered successfully!");
        //expect(res.statusCode).to.equal(201);
        console.log(res.body)

      }).catch());
  payload = {
    username: "admin",
    pswd: "admin"
  }
  it('2. - SIGNIN - sign user', () =>
    request(app)
      .post('/api/V1_1/auth/signin')
      .send(payload)
      .expect('Content-Type', /json/)
      .then((res) => {
        //expect(res.body.message).to.equal("User registered successfully!");
        //expect(res.statusCode).to.equal(201);
        console.log(res.body)
      }));

});