const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const User = require('../../models/User')
require('dotenv').config()
require('../../redis-connect')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

const editUser = {
  firstName: "chichi",
  lastName: "Akaniru",
  email: "kfjlqrzwyjuhf@arxxwalls.com",
}
const demoUser = {
  email: "kfjlqrzwyjuhf@arxxwalls.com",
  password: "12345678"
}

const demoUserAdmin = {
  email: "chieunice114@gmail.com",
  password: "12345678"
}

const shippingAddress = {
  shippingAddress: {
    name: "eunice chidinma",
           street1: "417 montgomery street",
           city: "San Francisco",
           state: "CA",
           zip: "94104",
           country: "US",
           phone: "415-123-4567"
   },
}

//const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
let token ;
let adminToken;
let _id;

describe('USER API', () => {
  beforeAll(async() => {
      await mongoConnect()
  }, 30000);

  afterAll(async () => {
      await mongoDisconnect();
    });

    test(' it should with Login user', async () => {
      const response = await request(app)
        .post('/v1/login')
        .send(demoUser)
        .expect('Content-Type', /json/)
        .expect(200)
      token = response._body.token;
    }, 30000)

    test(' it should with Login user', async () => {
      const response = await request(app)
        .post('/v1/login')
        .send(demoUserAdmin)
        .expect('Content-Type', /json/)
        .expect(200)
        adminToken = response._body.token;
    }, 30000)


/** Fetch authenticated user profile */
test('Should get profile for user', async () => {
  const res = await request(app)
    .get(`/v1/users/${demoUser}`)
    .set('Authorization', 'Bearer ' + token)
    .send()
    .expect('Content-Type', /json/)
    .expect(200)
   _id = (res._body._id);
}, 30000)

/** Fail in getting unathenticated user profile */
test('Should not get profile for unauthenticated user', async () => {
  const res = await request(app)
  .get(`/v1/users/${demoUser}`)
  .send()
  .expect('Content-Type', /json/)
  .expect(401)
}, 30000)

/** Should fail to make updates that are not allowed to user profile */

  test('get all user', async () => {
    const res = await request(app)
      .get(`/v1/users/${_id}`)
      .set('Authorization', 'Bearer ' + adminToken)
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
    }, 30000)

  test('Should get current  user', async () => {
    const res = await request(app)
      .get(`/v1/users/showme`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
    },30000)


  test("update user details", async () => {
    	const res = await request(app)
    		.patch(`/v1/users/updateUser/${_id}`)
        .set('Authorization', 'Bearer ' + token)
    		.send(editUser)
        .expect('Content-Type', /json/)
    		.expect(200);
        }, 30000)


test("update user details", async () => {
    const res = await request(app)
    .patch(`/v1/users/updateUser/${_id}`)
    .send({
        firstName: "chichi",
        lastName: "Akaniru",
        email: "kfjlqrzwyjuhf@arxxwalls.com",
      })
    .expect('Content-Type', /json/)
    .expect(401);
      }, 30000)

test("update user details", async () => {
  const res = await request(app)
  .patch(`/v1/users/change/shippingAddress`)
  .set('Authorization', 'Bearer ' + token)
  .send(shippingAddress)
  .expect('Content-Type', /json/)
  .expect(200);
  }, 30000)
    
  })