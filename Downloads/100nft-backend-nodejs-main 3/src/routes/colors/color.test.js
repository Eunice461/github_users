const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')

const demoColor = {
    shiteColor: "green",
    logoColor: "white"
}

const editColor = {
  shiteColor: "red",
  logoColor: "white",
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


      test('Should create new cart by admin', async ()  => {
        const res = await request(app)
          .post('/v1/colors')
          .set('Authorization', 'Bearer ' + adminToken)
          .send(demoColor)
          .expect('Content-Type', /json/)
          .expect(201)
          _id = res.body._id
      }, 30000)

      test('Should create new cart by normal user', async ()  => {
        const res = await request(app)
          .post('/v1/colors')
          .set('Authorization', 'Bearer ' + token)
          .send(demoColor)
          .expect('Content-Type', /json/)
          .expect(403)
      }, 30000)
      
      
      
      /**
       * Testing GET post by id
       */
      
       test('Should get single cart by id', async () => {
        const res = await request(app)
          .get(`/v1/colors/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)

      }, 30000)
      
      /**
       * Testing get post of a particular user
       */
      
      test('Should get all color', async ()  => {
        const res = await request(app)
          .get(`/v1/colors/`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 30000)

      test('Should edit color by admin', async () => {
        const res = await request(app)
          .patch(`/v1/colors/${_id}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .send(editColor)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 3000)

      test('Should edit color by normal user', async () => {
        const res = await request(app)
          .patch(`/v1/colors/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .send(editColor)
          .expect('Content-Type', /json/)
          .expect(403)
      }, 3000)

      /**
       * Testing color  deletion
       */
      
       test('Should delete color by admin', async () => {
        const res = await request(app)
          .delete(`/v1/colors/${_id}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
      }, 3000)

      test('Should delete color by normal', async () => {
        const res = await request(app)
          .delete(`/v1/colors/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(403)
      }, 3000)
      
    })