const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
const AdminToken = require('../../models/AdminToken')
require('../../redis-connect')





const testUserId = new mongoose.Types.ObjectId()
const demoPropose = {
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

  const originalToken = "62ffc9e22e9b56f681466628"

searchPropose = {
  searchTerm: "n"
}

editWalletAddress = {
  userWalletAddress: "wallet",
}

createCommission = {
  expiryDate: "2022-08-10T02:37:02",
    commission: "40%"
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

describe('PROPOSE TOKEN API', () => {
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
      

      test('Should create new Propose', async ()  => {
        const res = await request(app)
          .post(`/v1/propose/token/${originalToken}/original`)
          .set('Authorization', 'Bearer ' + token)
          .send(demoPropose)
          .expect('Content-Type', /json/)
          .expect(201)
          _id = (res._body._id);
      }, 30000)


      test('Should get all Propose', async ()  => {
        const res = await request(app)
          .get('/v1/propose/token')
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get single Propose', async ()  => {
        const res = await request(app)
          .get(`/v1/propose/token/${_id}`)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should all user Propose', async ()  => {
        const res = await request(app)
          .get('/v1/propose/token/user/token')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should like a Propose', async ()  => {
        const res = await request(app)
          .patch(`/v1/propose/token/${_id}/like`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get all liked Propose', async ()  => {
        const res = await request(app)
          .get('/v1/propose/token/get/alllike')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get all token Propose', async ()  => {
        const res = await request(app)
          .get('/v1/propose/token/getalltoken/admin')
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should search token Propose', async ()  => {
        const res = await request(app)
          .post('/v1/propose/token/search/token')
          .set('Authorization', 'Bearer ' + token)
          .send(searchPropose)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get all tranding token Propose', async ()  => {
        const res = await request(app)
          .get('/v1/propose/token/get/trendingtoken')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should edit token Propose', async ()  => {
        const res = await request(app)
          .patch(`/v1/propose/token/${_id}/editwalletaddress`)
          .set('Authorization', 'Bearer ' + token)
          .send(editWalletAddress)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get randmon token Propose', async ()  => {
        const res = await request(app)
          .get('/v1/propose/token/random/token')
          .set('Authorization', 'Bearer ' + adminToken)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should add commission token Propose', async ()  => {
        const res = await request(app)
          .patch(`/v1/propose/token/add/commission/${_id}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .send(createCommission)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should edit token Propose', async ()  => {
        const res = await request(app)
          .patch(`/v1/propose/token/remove/commission/${_id}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should add commission for all token Propose', async ()  => {
        const res = await request(app)
          .patch('/v1/propose/token/addall/commission')
          .set('Authorization', 'Bearer ' + adminToken)
          .send(createCommission)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should remove commission for all token Propose', async ()  => {
        const res = await request(app)
          .patch('/v1/propose/token/removeall/commission')
          .set('Authorization', 'Bearer ' + adminToken)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)



      test('Should delete Propose', async ()  => {
        const res = await request(app)
          .delete(`/v1/propose/token/${_id}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

    })