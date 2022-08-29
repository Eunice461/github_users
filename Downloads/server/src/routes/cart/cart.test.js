const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
const { response } = require('../../app')
require('../../redis-connect')

const testUserId = new mongoose.Types.ObjectId()
const demoCart = {
  tokenId: "62fbbc5710797ecd7fc0ade6",
  size: "M",
  color: "bule",
  quantity: 2,
  replicaImage: "hello.jpg",
  logoDisplayUrl: "me.jpg"
}

const demoUser = {
  email: "kfjlqrzwyjuhf@arxxwalls.com",
  password: "12345678"
}

//const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
let token ;
let _id;

describe('CART API', () => {
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

    test('Should create new cart', async ()  => {
        const res = await request(app)
          .post('/v1/cart')
          .set('Authorization', 'Bearer ' + token)
          .send(demoCart)
          .expect('Content-Type', /json/)
          .expect(200)
          const getId = res._body.cartItems.map(item => item._id);
         _id = getId[0];
      }, 30000)

    test('Should GET all user cart', async ()  => {
      const res = await request(app)
        .get('/v1/cart')
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200)
    }, 30000)

    test('Should GET single user cart', async ()  => {
      const res = await request(app)
        .get(`/v1/cart/${_id}/single`)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200)
    }, 30000)


    test('Should PATCH single user cart', async ()  => {
      const res = await request(app)
        .patch(`/v1/cart/${_id}`)
        .set('Authorization', 'Bearer ' + token)
        .send(demoCart)
        .expect('Content-Type', /json/)
        .expect(200)
    }, 30000)

    test('Should DELETE single user cart', async ()  => {
      const res = await request(app)
        .delete('/v1/cart/')
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200)
    }, 30000)
      

  })
      