const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')



const testUserId = new mongoose.Types.ObjectId()
const demoCart = {
    userId: "6245bc757649603bf782b452",
    tokens: {
    tokenId: "6245bd4e7649603bf782b455"
}
}


const testCartId = new mongoose.Types.ObjectId()
const testCart = {
  _id: testCartId,
  ...demoCart
}

const demoUser = {
  firstName: "darasimi",
  lastName: "Akaniru",
  email: "chieunice114@gmail.com",
  password: "123456",
  confirmPassword: "123456",
  isVerified: true
}

const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
  
describe('CART API', () => {
    beforeAll(async() => {
		jest.setTimeout(6000)
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect();
      });

      test('Should create new cart', async ()  => {
        
        const res = await request(app)
          .post('/v1/cart')
          .set('Authorization', 'Bearer ' + token)
          .send(demoCart)
          .expect('Content-Type', /json/)
          .expect(201)
      })
      
      
      
      /**
       * Testing GET post by id
       */
      
       test('Should get single cart by id', async () => {
        const res = await request(app)
          .get(`/v1/cart/find/624d91659ff3dcbbfdbae106`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)

      })
      
      /**
       * Testing get post of a particular user
       */
      
      test('Should retrieve all cart created by a user', async ()  => {
        
        const res = await request(app)
          .get(`/v1/cart/`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
        
      })

      /**
       * Testing post deletion
       */
      
       test('Should delete cart', async () => {
       
        const res = await request(app)
          .delete(`/v1/cart/624d94f50975cdfcb68b8955`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
      })
    })
   