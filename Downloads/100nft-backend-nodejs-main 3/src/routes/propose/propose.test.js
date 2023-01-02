const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
const AdminToken = require('../../models/AdminToken')
require('../../redis-connect')

const demoPropose = {
  nftName: "lov",
  tokenId: 6,
  userWalletAddress: "editwalletaddress",
  DesignUrl: "http/image.com",
  logoDisplayUrl: "http/image.com",
  shiteColor: "red",
  logoColor: "gold",
  sizes: "M",
  description: "this is me"
  }

  const demoOriginalToken = {
    nftName: "love",
    tokenId: 1,
    userWalletAddress: "editwalletaddress",
    DesignUrl: "http/image.com",
    logoDisplayUrl: "http/image.com",
    shiteColor: "red",
    logoColor: "gold",
    sizes: "M",
    description: "this is me"
}

const demoAdminToken = {
  nftName: "you",
  tokenId: 101,
  userWalletAddress: "editwalletaddress",
  DesignUrl: "http/image.com",
  logoDisplayUrl: "http/image.com",
  shiteColor: "red",
  logoColor: "gold",
  sizes: "M",
  description: "this is me"
}

searchPropose = {
  searchTerm: "n"
}

editWalletAddress = {
  userWalletAddress: "wallet",
}

createCommission = {
  expiryDate: "2022-08-10",
  commission: "40%"
}

const demoUser = {
  email: "khervie00@outlook.com",
  password: "123456"
}

const demoUserAdmin = {
  email: "management@100pcotton.com",
  password: "Letmeinm8"
}

//const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
let token ;
let adminToken;
let _id;
let adminId
let originalTokenId

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
      token = response.body.token;
    }, 30000)

    test(' it should with Login user Admin', async () => {
      const response = await request(app)
        .post('/v1/login')
        .send(demoUserAdmin)
        .expect('Content-Type', /json/)
        .expect(200)
      adminToken = response.body.token;
    }, 30000)

    test('Should create new Admin Token', async ()  => {
      const res = await request(app)
        .post('/v1/admin/token')
        .set('Authorization', 'Bearer ' + adminToken)
        .send(demoAdminToken)
        .expect('Content-Type', /json/)
        .expect(201)
        adminId = res.body._id;
    }, 30000);

      test('Should create new original token', async ()  => {
        const res = await request(app)
          .post(`/v1/original/token/${adminId}`)
          .set('Authorization', 'Bearer ' + token)
          .send(demoOriginalToken)
          .expect('Content-Type', /json/)
          .expect(201)
          originalTokenId = (res.body._id);
      }, 30000)

      

      test('Should create new Propose', async ()  => {
        const res = await request(app)
          .post(`/v1/propose/token/${originalTokenId}/original`)
          .set('Authorization', 'Bearer ' + token)
          .send(demoPropose)
          .expect('Content-Type', /json/)
          .expect(201)
          _id = (res.body._id);
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

      test('Should delete original token', async ()  => {
        const res = await request(app)
          .delete(`/v1/original/token/${originalTokenId}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should delete Admin Token', async ()  => {
        const res = await request(app)
          .delete(`/v1/admin/token/${adminId}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

    })