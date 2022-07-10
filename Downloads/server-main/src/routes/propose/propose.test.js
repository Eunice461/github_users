const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')



const testUserId = new mongoose.Types.ObjectId()
const demoPropose = {
  user: testUserId,
  nftName: "admin nft",
  tokenId: 24682468,
  userWalletAddress: "adminwallet",
  DesignUrl: "http/image.com",
  price: 50,
}


const testCartId = new mongoose.Types.ObjectId()
const testCart = {
  _id: testCartId,
  ...demoPropose 
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
  
describe('Propose API', () => {
    beforeAll(async() => {
		jest.setTimeout(6000)
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect();
      });

      test('Should create new Propose', async ()  => {
        
        const res = await request(app)
          .post('/v1/propose')
          .set('Authorization', 'Bearer ' + token)
          .send(demoPropose)
          .expect('Content-Type', /json/)
          .expect(201)
      })
      
      
    })