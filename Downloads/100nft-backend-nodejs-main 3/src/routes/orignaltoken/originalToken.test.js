const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')


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

editWalletAddress = {
  userWalletAddress: "wallet",
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
let adminId

describe('ORIGINAL TOKEN API', () => {
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
          _id = (res.body._id);
      }, 30000)


      test('Should get all original token', async ()  => {
        const res = await request(app)
          .get('/v1/original/token')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get single original token', async ()  => {
        const res = await request(app)
          .get(`/v1/original/token/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should all user token', async ()  => {
        const res = await request(app)
          .get('/v1/original/token/user/token')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should edit token ', async ()  => {
        const res = await request(app)
          .patch(`/v1/original/token/${_id}/editwalletaddress`)
          .set('Authorization', 'Bearer ' + token)
          .send(editWalletAddress)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get all original token', async ()  => {
        const res = await request(app)
          .get('/v1/admin/token/getalltoken/admin')
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should delete original token', async ()  => {
        const res = await request(app)
          .delete(`/v1/original/token/${_id}`)
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