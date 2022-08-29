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
  tokenId: "62fd36f25fe4203212d0a639",
  quantity: 1,
  shippingAddress: {
   name: "eunice chidinma",
          street1: "417 montgomery street",
          city: "San Francisco",
          state: "CA",
          zip: "94104",
          country: "US",
          phone: "415-123-4567"
  },
  shippingPrice: 50 
}

const demoOrderReplica = {
  replicaId: "",
  quantity: 1,
  shippingAddress: {
   name: "eunice chidinma",
          street1: "417 montgomery street",
          city: "San Francisco",
          state: "CA",
          zip: "94104",
          country: "US",
          phone: "415-123-4567"
  },
  shippingPrice: 50 
}

const status = {
  status: "pending"
}

const demoUser = {
  email: "kfjlqrzwyjuhf@arxxwalls.com",
  password: "12345678"
}

const demoUserAdmin = {
  email: "chieunice114@gmail.com",
  password: "12345678"
}

//const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
let token ;
let adminToken;
let _id;

describe('ORDER API', () => {
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


      test('Should create new order', async () => {
        const res= await request(app)
          .post('/v1/order')
          .set('Authorization', 'Bearer ' + token)
          .send(demoOrder)
          .expect('Content-Type', /json/)
          .expect(201)
      _id = (res._body._id);
      }, 30000)
      
      /**
       * Testing GET Order by id
       */
      
      test('Should get single order by id', async () => {
        const res = await request(app)
          .get(`/v1/order/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
    
      }, 3000)


      test('Should get single order by id', async () => {
        const res = await request(app)
          .get(`/v1/order/${_id}`)
          .expect('Content-Type', /json/)
          .expect(401)
    
      }, 3000)
      
      /**
       * Testing get all order of a particular user
       */
      
      test('Should retrieve all order created by a user', async () => {
        const res = await request(app)
          .get(`/v1/order/get/user`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 3000)

      /**
       * Testing get all order only by the admin
       */
      
       test('Should retrieve all order', async () => {
        const res = await request(app)
          .post(`/v1/order/get`)
          .set('Authorization', 'Bearer ' + adminToken)
          .send(status)
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 30000)

      /**
       * Testing get new order by the admin
       */
      
       test('Should retrieve all new order by admin', async () => {
        const res = await request(app)
          .get(`/v1/order/allnew/order`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(403)
        
      }, 3000)

      test('Should retrieve all new order by admin', async () => {
        const res = await request(app)
          .get(`/v1/order/allnew/order`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 3000)

      /**
       * Testing get income by the admin
       */
      
       test('Should get income', async () => {
        const res = await request(app)
          .get(`/v1/order/get/income`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(403)
        
      }, 30000)

      test('Should get income', async () => {
        const res = await request(app)
          .get(`/v1/order/get/income`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 30000)

    })
