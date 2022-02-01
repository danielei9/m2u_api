import * as express from 'express';
import controller from './auth.controller.js';

export default express
  .Router()
  .post('/signin', controller.signin)
  .post('/signup', controller.signup)
