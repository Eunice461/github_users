const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const Token = require('../../models/Token')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')



const testUserId = new mongoose.Types.ObjectId()
const demoPrice = {
        price: 50,
}


const testTokenId = new mongoose.Types.ObjectId()
const testToken = {
  _id: testTokenId,
  ...demoPrice
}

const demoUser = {
  firstName: "darasimi",
  lastName: "Akaniru",
  email: "chieunice114@gmail.com",
  password: "123456",
  confirmPassword: "123456",
  isVerified: true,
  role: "admin"
}

const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})

describe('TOKEN API', () => {
    beforeAll(async() => {
		jest.setTimeout(6000)
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect();
      });

      test('Should create new replicaPrice', async ()  => {
        const res = await request(app)
          .post('/v1/replicaPrice')
          .set('Authorization', 'Bearer ' + token)
          .send(demoPrice)
          .expect('Content-Type', /json/)
          .expect(201)
      })
      
      

      // test('Should update the token data', async (done) => {
      //   const res = await request(app)
      //     .patch(`/post/${testPostId}`)
      //     .set('Authorization', 'Bearer ' + token)
      //     .send(updatePost)
              //.expect('Content-Type', /json/)
      //     .expect(HttpStatus.OK)
      //   done()
      // })
      
      /**
       * Testing get post of a particular user
       */
      
      test('Should retrieve all replicas price', async ()  => {
        const res = await request(app)
          .get(`/v1/replicaPrice/`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
        
      })


      /**
       * Testing token deletion
       */
      
       test('Should delete replica', async () => {
        const res = await request(app)
        .delete(`/v1/replicaPrice/624da3f0483fe90cca454245`)
        .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
  
      })

    })