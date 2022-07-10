const mongoose  = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const Order = require("../../models/Order");
require('../../redis-connect')



const testUserId = new mongoose.Types.ObjectId()
const demoOrder = {
  userId: "624d4b320087c4d04b7cb7e3",
  tokenId: "624af651f00b88fbb7880c0e",
    shippingAddress: {
      address: "university of ibadan",
      city: "ibadan",
      postalCode: "24248",
      country: "nigeria"
    },
}

const testOrderId = new mongoose.Types.ObjectId()
const testOrder = {
  _id: testOrderId
}

const demoUser = {
  firstName: "darasimi",
  lastName: "Akaniru",
  email: "chieunice114@gmail.com",
  password: "123456",
  confirmPassword: "123456",
  role: "admin"
}

const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})

describe('ORDER API', () => {
    beforeAll(async() => {
		jest.setTimeout(6000)
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect();
      });

      test('Should create new order', async () => {
        const res= await request(app)
          .post('/v1/order')
          .set('Authorization', 'Bearer ' + token)
          .send(demoOrder)
          .expect('Content-Type', /json/)
          .expect(201)
      
        
      
      })
      
      
      /**
       * Testing GET post by id
       */
      
      test('Should get single order by id', async () => {
        const res = await request(app)
          .get(`/v1/order/624d91565df4882447051be2`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
    
      })

      test('Should update the order for pay', async () => {
        const res = await request(app)
          .patch(`/v1/order/624d91565df4882447051be2/pay`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
        
      })

      test('Should update the order for deliver', async () => {
        const res = await request(app)
          .patch(`/v1/order/624d91565df4882447051be2/deliver`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
        
      })
      
      /**
       * Testing get post of a particular user
       */
      
      test('Should retrieve all order created by a user', async () => {
        const res = await request(app)
          .get(`/v1/order`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(503)
        
      })

      test('Should get current  order', async () => {
        const res = await request(app)
          .get(`/v1/order/showAllMyOrders`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
        })

    })
