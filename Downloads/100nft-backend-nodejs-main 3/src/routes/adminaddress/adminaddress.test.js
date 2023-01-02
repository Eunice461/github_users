const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')



const testUserId = new mongoose.Types.ObjectId()
const demoAddress = {
    pickupAddress: {
        company: "100%NFT",
        street1: "417 montgomery street",
        city: "San Francisco",
        state: "CA",
        zip: "94104",
        country: "US",
        phone: "415-123-4567"
},
      },

editAddress = {
    name: "dara amade"
}

const demoUser = {
  email: "khervie00@outlook.com",
  password: "123456"
}

const demoUserAdmin = {
  email: "management@100pcotton.com",
  password: "Letmeinm8"
}

let token ;
let adminToken;
let _id;

describe('COLOR API', () => {
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


      test('Should create new address by admin', async ()  => {
        const res = await request(app)
          .post('/v1/address')
          .set('Authorization', 'Bearer ' + adminToken)
          .send(demoAddress)
          .expect('Content-Type', /json/)
          .expect(201)
          _id = (res._body._id);
      }, 30000)
      
      test('Should fail to create new address by normal user', async ()  => {
        const res = await request(app)
          .post('/v1/address')
          .set('Authorization', 'Bearer ' + token)
          .send(demoAddress)
          .expect('Content-Type', /json/)
          .expect(403)
      }, 30000)
      
      
      /**
       * Testing GET get addess
       */
      
       test('Should get singleaddress by admin', async () => {
        const res = await request(app)
          .get(`/v1/address/`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)

      }, 30000)

      test('Should fail to  get singleaddress', async () => {
        const res = await request(app)
          .get(`/v1/address/`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(403)

      }, 30000)
      
      /**
       * Testing edit address
       */
      
      test('Should patch addess by admin', async ()  => {
        const res = await request(app)
          .get(`/v1/address/${_id}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .send(editAddress)
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 30000)

      test('Should fail patch addess by admin', async ()  => {
        const res = await request(app)
          .get(`/v1/address/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .send(editAddress)
          .expect('Content-Type', /json/)
          .expect(403)
        
      }, 30000)

      /**
       * Testing post deletion
       */
      
       test('Should delete address by admin', async () => {
        const res = await request(app)
          .delete(`/v1/address/${_id}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
      }, 3000)

      test('Should delete address by admin', async () => {
        const res = await request(app)
          .delete(`/v1/address/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(403)
      }, 3000)


    })