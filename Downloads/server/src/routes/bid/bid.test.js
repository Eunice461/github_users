const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')



const testUserId = new mongoose.Types.ObjectId()
const demoBid = {
    price: 100
}

const auctionId = ""

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

describe('BID API', () => {
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

    test(' it should with Login user Admin', async () => {
      const response = await request(app)
        .post('/v1/login')
        .send(demoUserAdmin)
        .expect('Content-Type', /json/)
        .expect(200)
      adminToken = response._body.token;
    }, 30000)


      test('Should create new bid', async ()  => {
        const res = await request(app)
          .post(`/v1/bid/create/${auctionId}`)
          .set('Authorization', 'Bearer ' + token)
          .send(demoBid)
          .expect('Content-Type', /json/)
          .expect(201)
          _id =(res._body._id)
      }, 30000)

       /**
       * Testing GET all bid creating for an auction 
       */
      
        test('Should get single cart by id', async () => {
          const res = await request(app)
            .get(`/v1/bid/${auctionId}`)
            .set('Authorization', 'Bearer ' + token)
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
  
        }, 3000)
      
      
      /**
       * Testing GET auction by id
       */
      
       test('Should get single cart by id', async () => {
        const res = await request(app)
          .get(`/v1/bid/single${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)

      }, 3000)
      
      
    })