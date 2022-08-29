const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')





const testUserId = new mongoose.Types.ObjectId()
const demoPropose = {
    user: "62fa2024aa5619559dcc0a1d",
    nftName: "love",
    tokenId: 100,
    userWalletAddress: "editwalletaddress",
    DesignUrl: "http/image.com",
    logoDisplayUrl: "http/image.com",
    shiteColor: "red",
    logoColor: "gold",
    sizes: "M",
    description: "this is me"
}



const testCartId = new mongoose.Types.ObjectId()
const testCart = {
  _id: testCartId,
  ...demoPropose 
}

const demoUser = {
    email: "chieunice114@gmail.com",
    password: "12345678"
}

//const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
let token ;
  
describe('Propose API', () => {
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
      

      test('Should create new Propose', async ()  => {
        const res = await request(app)
          .post('/v1/admin/token')
          .set('Authorization', 'Bearer ' + token)
          .send(demoPropose)
          .expect('Content-Type', /json/)
          .expect(201)
      }, 30000)


      test('Should get all Propose', async ()  => {
        const res = await request(app)
          .get('/v1/admin/token')
          .send(demoPropose)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get single Propose', async ()  => {
        const res = await request(app)
          .get('/v1/admin/token/62fbbc5710797ecd7fc0ade6')
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should like a Propose', async ()  => {
        const res = await request(app)
          .patch('/v1/admin/token/62fbbc5710797ecd7fc0ade6/like')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get all liked Propose', async ()  => {
        const res = await request(app)
          .get('/v1/admin/token/get/alllike')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get all token Propose', async ()  => {
        const res = await request(app)
          .get('/v1/admin/token/getalltoken/admin')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should delete Propose', async ()  => {
        const res = await request(app)
          .delete('/v1/admin/token/62fe3ed870808bba165e92f6')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

    })