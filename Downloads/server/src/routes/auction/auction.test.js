const mongoose  = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const Auction = require("../../models/Auction");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const User = require("../../models/User");
require('../../redis-connect')



const testUserId = new mongoose.Types.ObjectId()
const demoAuction = {
  tokenId: "630090988deab894925c7ab6",
  userWalletAddress: "editwalletaddress",
  expiryDate: "2022-08-20T10:32:04.826+00:00",
  price: 600
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

describe('AUCTION API', () => {
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


      test('Should create new auction', async () => {
        const response = await request(app)
          .post('/v1/auction')
          .set('Authorization', 'Bearer ' + token)
          .send(demoAuction)
          .expect(201)
          _id = (res._body._id)
      }, 30000)

      
      /**
       * Testing GET auction by id
       */
      
      test('Should get single auction by id', async () => {
        await request(app)
          .get(`/v1/auction/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect(200)
    
      }, 30000)

      /**
       * Testing GET auction all auction
       */

      test('Should get single auction by id', async () => {
        await request(app)
          .get(`/v1/auction/`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect(200)
    
      }, 30000)

      /**
       * Testing GET auction all user auction
       */

       test('Should get single auction by id', async () => {
        await request(app)
          .get(`/v1/auction/user/auction`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect(200)
    
      }, 30000)

      /**
       * Testing GET auction auction expiration data
       */

      test('Should retrieve all auctions created by a user', async () => {
        await request(app)
          .get(`/v1/auction/get/expirationDate`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect(200)
        
      })

      /**
       * Testing auction deletion
       */
      
       test('Should delete auction', async () => {
        await request(app)
          .delete(`/v1/auction/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect(200)

      })

    })