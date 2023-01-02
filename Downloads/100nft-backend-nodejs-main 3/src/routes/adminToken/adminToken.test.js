const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')


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

const demoUser = {
  email: "management@100pcotton.com",
  password: "Letmeinm8"
}

let token ;
let id;
  
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
      

      test('Should create new Admin Token', async ()  => {
        const res = await request(app)
          .post('/v1/admin/token')
          .set('Authorization', 'Bearer ' + token)
          .send(demoAdminToken)
          .expect('Content-Type', /json/)
          .expect(201)
          id = res.body._id;
      }, 30000);


      test('Should get all Admin Token', async ()  => {
        const res = await request(app)
          .get('/v1/admin/token')
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get single Admin Token', async ()  => {
        const res = await request(app)
          .get(`/v1/admin/token/${id}`)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should like a Admin Token', async ()  => {
        const res = await request(app)
          .patch(`/v1/admin/token/${id}/like`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get all liked Admin Token', async ()  => {
        const res = await request(app)
          .get('/v1/admin/token/get/alllike')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should get all Admin Token', async ()  => {
        const res = await request(app)
          .get('/v1/admin/token/getalltoken/admin')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

      test('Should delete Admin Token', async ()  => {
        const res = await request(app)
          .delete(`/v1/admin/token/${id}`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

    })