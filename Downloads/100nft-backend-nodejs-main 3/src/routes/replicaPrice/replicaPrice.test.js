const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')



const testUserId = new mongoose.Types.ObjectId()
const demoPrice = {
        price: 35,
}

editPrice = {
  price: 50,
}

const demoUser = {
  email: "khervie00@outlook.com",
  password: "123456"
}

const demoUserAdmin = {
  email: "management@100pcotton.com",
  password: "Letmeinm8"
}

//const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
let token ;
let adminToken;
let _id;

describe('REPILCA PRICE API', () => {
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


      test('Should create new replicaPrice', async ()  => {
        const res = await request(app)
          .post('/v1/replicaPrice')
          .set('Authorization', 'Bearer ' + adminToken)
          .send(demoPrice)
          .expect('Content-Type', /json/)
          .expect(201)
          //_id = res._body._id
          _id = (res.body._id);
      }, 3000)


      test('Should create new replicaPrice by normal user', async ()  => {
        const res = await request(app)
          .post('/v1/replicaPrice')
          .set('Authorization', 'Bearer ' + token)
          .send(demoPrice)
          .expect('Content-Type', /json/)
          .expect(403)
      }, 3000)
      
    
      test('Should update the token data', async () => {
        const res = await request(app)
        .patch(`/v1/replicaPrice/${_id}`)
        .set('Authorization', 'Bearer ' + adminToken)
        .send(editPrice)
        .expect('Content-Type', /json/)
        .expect(200)
      },30000)

      test('Should update the token data by normal user', async () => {
        const res = await request(app)
        .patch(`/v1/replicaPrice/${_id}`)
        .set('Authorization', 'Bearer ' + token)
        .send(editPrice)
        .expect('Content-Type', /json/)
        .expect(403)
      },30000)
      
      /**
       * Testing get post of a particular user
       */
      
      test('Should retrieve all replicas price', async ()  => {
        const res = await request(app)
          .get(`/v1/replicaPrice`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 30000)


      /**
       * Testing token deletion
       */

       test('Should delete replica by normal user', async () => {
        const res = await request(app)
        .delete(`/v1/replicaPrice/${_id}`)
        .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(403)
  
      }, 3000)
      
       test('Should delete replica', async () => {
        const res = await request(app)
        .delete(`/v1/replicaPrice/${_id}`)
        .set('Authorization', 'Bearer ' + adminToken)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
  
      }, 30000)

    })