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
    user : "6237e3889feaace923ef43e1",
    tokenId : "623c311b25b06f43793f058e",
    userWalletAddress: "adminwallet",
    price: 500,
    status: "pending"
}

const updatePost = {
  content: 'updated post content'
}


const testAuctionId = new mongoose.Types.ObjectId()
const testAuction = {
  _id: testAuctionId,
  ...demoAuction
}

const demoUser = {
  firstName: "darasimi",
  lastName: "Akaniru",
  email: "chieunice114@gmail.com",
  password: "123456",
  confirmPassword: "123456"
}


const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})

describe('Auction API', () => {
    beforeAll(async() => {
		jest.setTimeout(6000)
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect();
      });

      test('Should create new auction', async () => {
        const response = await request(app)
          .post('/v1/auction')
          .set('Authorization', 'Bearer ' + token)
          .send(demoAuction)
          .expect(201)
      
      })
      
      /**
       * Testing auction deletion
       */
      
      test('Should delete auction', async () => {
        await request(app)
          .delete(`/v1/auction/624da45e20801253b0585d05`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect(200)

      })

      
      /**
       * Testing GET auction by id
       */
      
      test('Should get single auction by id', async () => {
        await request(app)
          .get(`/v1/auction/624b56727259a14c3df7ef46`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect(200)
    
      })

      test('Should update the auction data', async () => {
        await request(app)
          .patch(`/v1/auction/${testAuctionId}`)
          .set('Authorization', 'Bearer ' + token)
          .send(updatePost)
          .expect(404)
        
      })
      
      /**
       * Testing get post of a particular user
       */
      
      test('Should retrieve all auctions created by a user', async () => {
        await request(app)
          .get(`/v1/auction`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect(200)
        
      })

    })