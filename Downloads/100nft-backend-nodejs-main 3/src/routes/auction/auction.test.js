const mongoose  = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const Auction = require("../../models/Auction");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const User = require("../../models/User");
require('../../redis-connect')

const demoPropose = {
  nftName: "lov",
  tokenId: 9,
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
let adminId
let originalTokenId
let proposedId
let _id;


describe('AUCTION API', () => {
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
          proposedId = (res.body._id);
      }, 30000)

      test('Should create new auction', async () => {
        const res = await request(app)
          .post(`/v1/auction/token/`)
          .set('Authorization', 'Bearer ' + token)
          .send({
            tokenId: proposedId,
            userWalletAddress: "editwalletaddress",
            expiryDate: "2022-08-20T10:32:00",
            price: 600
          })
          .expect(201)
          _id = (res.body._id)
      }, 30000)

   /**
       * Testing GET auction auction expiration data
       */

    test('Should retrieve all auctions expiration date', async () => {
      await request(app)
        .get(`/v1/auction/token/get/expirationDate`)
        .set('Authorization', 'Bearer ' + token)
        .send()
        .expect(200)
      
    }, 30000)


      /**
       * Testing GET auction all user auction
       */

       test('Should get single auction by id', async () => {
        await request(app)
          .get(`/v1/auction/token/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect(200)
    
      }, 30000)

      /**
       * Testing GET all users auction
       */

       test('Should retrieve all auctions created by a user', async () => {
        await request(app)
          .get(`/v1/auction/token/user/auction`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect(200)
        
      }, 30000)


      /**
       * Testing auction deletion
       */
      
       test('Should delete auction', async () => {
        await request(app)
          .delete(`/v1/auction/token/${_id}`)
          .set('Authorization', 'Bearer ' + token)
          .send()
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

      test('Should delete Propose', async ()  => {
        const res = await request(app)
          .delete(`/v1/propose/token/${proposedId}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

    })