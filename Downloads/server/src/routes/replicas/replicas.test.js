const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')



const testUserId = new mongoose.Types.ObjectId()
const demoReplica = {
  nftName: "you",
  tokenId: 109,
  userWalletAddress: "editwalletaddress",
  DesignUrl: "http/image.com",
  logoDisplayUrl: "http/image.com",
  shiteColor: "red",
  logoColor: "gold",
  sizes: "M",
  description: "this is me"
}

const originalToken = "62fd5f57f46b0ba943523a85"

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
let _id

describe('REPLICA API', () => {
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


      test('Should create new replica', async ()  => {
        const res = await request(app)
          .post(`/v1/replica/token/${originalToken}`)
          .set('Authorization', 'Bearer ' + token)
          .send(demoReplica)
          .expect('Content-Type', /json/)
          .expect(201)
         _id = (res._body.replica._id);
      }, 30000)
      
      
      /**
       * Testing GET token by id
       */
      
      test('Should get single replica by id', async () => {
        const res = await request(app)
        .get(`/v1/replica/token/${_id}`)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200)

      }, 30000)

      test('Should get user replica', async () => {
        const res = await request(app)
        .get(`/v1/replica/token/user`)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200)

      }, 30000)
      

      test('Should retrieve all replicas', async ()  => {
        const res = await request(app)
          .get(`/v1/replica/token/get/color`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 30000)


      /**
       * Testing token deletion
       */
      
       test('Should delete replica by admin', async () => {
        const res = await request(app)
        .delete(`/v1/replica/token/${_id}/admin`)
        .set('Authorization', 'Bearer ' + adminToken)
        .expect('Content-Type', /json/)
        .expect(200)
  
      }, 30000)

    })