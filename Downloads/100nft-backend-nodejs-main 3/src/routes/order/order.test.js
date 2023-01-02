const mongoose  = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const Order = require("../../models/Order");
require('../../redis-connect')

const status = {
  status: "pending"
}

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
let replicaId
let createReplica
let createOriginalToken;

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
      token = response.body.token;
    }, 30000)

    test(' it should with Login user', async () => {
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

      test('Should create new replica', async ()  => {
        const res = await request(app)
          .post(`/v1/replica/token/${proposedId}`)
          .set('Authorization', 'Bearer ' + token)
          .send(demoReplica)
          .expect('Content-Type', /json/)
          .expect(201)
         replicaId = (res.body.replica._id);
      }, 30000)

       /**
       * Testing CREATE NEW ORDER WITH ORIGINALTOKENID
       */

      test('Should create new order', async () => {
        const res= await request(app)
          .post('/v1/order')
          .set('Authorization', 'Bearer ' + token)
          .send({
            tokenId: originalTokenId,
            quantity: 1,
            shippingAddress: {
             name: "eunice chidinma",
                    street1: "417 montgomery street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94104",
                    country: "US",
                    phone: "415-123-4567"
            },
            shippingPrice: 50 
          })
          .expect('Content-Type', /json/)
          .expect(201)
          createOriginalToken = (res.body._id);
      }, 30000)

      /**
       * Testing CREATE NEW ORDER WITH REPLICAID
       */
      

      test('Should create new order', async () => {
        const res= await request(app)
          .post('/v1/order')
          .set('Authorization', 'Bearer ' + token)
          .send({
            replicaId: replicaId,
            quantity: 1,
            shippingAddress: {
             name: "eunice chidinma",
                    street1: "417 montgomery street",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94104",
                    country: "US",
                    phone: "415-123-4567"
            },
            shippingPrice: 50 
          })
          .expect('Content-Type', /json/)
          .expect(201)
      createReplica = (res.body._id);
      }, 30000)
      
      /**
       * Testing GET Order by id
       */
      
      test('Should get single order by id', async () => {
        const res = await request(app)
          .get(`/v1/order/${createOriginalToken}`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
    
      }, 3000)

      test('Should get single order by id', async () => {
        const res = await request(app)
          .get(`/v1/order/${createReplica}`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
    
      }, 3000)


      test('Should get single order by id', async () => {
        const res = await request(app)
          .get(`/v1/order/${createOriginalToken}`)
          .expect('Content-Type', /json/)
          .expect(401)
    
      }, 3000)

      test('Should get single order by id', async () => {
        const res = await request(app)
          .get(`/v1/order/${createReplica}`)
          .expect('Content-Type', /json/)
          .expect(401)
    
      }, 3000)
      
      /**
       * Testing get all order of a particular user
       */
      
      test('Should retrieve all order created by a user', async () => {
        const res = await request(app)
          .get(`/v1/order/get/user`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 3000)

      /**
       * Testing get all order only by the admin
       */
      
       test('Should retrieve all order', async () => {
        const res = await request(app)
          .post(`/v1/order/get`)
          .set('Authorization', 'Bearer ' + adminToken)
          .send(status)
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 30000)

      /**
       * Testing get new order by the admin
       */
      
       test('Should retrieve all new order by admin', async () => {
        const res = await request(app)
          .get(`/v1/order/allnew/order`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(403)
        
      }, 3000)

      test('Should retrieve all new order by admin', async () => {
        const res = await request(app)
          .get(`/v1/order/allnew/order`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 3000)

      /**
       * Testing get income by the admin
       */
      
       test('Should get income', async () => {
        const res = await request(app)
          .get(`/v1/order/get/income`)
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(403)
        
      }, 30000)

      test('Should get income', async () => {
        const res = await request(app)
          .get(`/v1/order/get/income`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
        
      }, 30000)

      test('Should delete replica by admin', async () => {
        const res = await request(app)
        .delete(`/v1/replica/token/${replicaId}/admin`)
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

      test('Should delete Propose', async ()  => {
        const res = await request(app)
          .delete(`/v1/propose/token/${proposedId}`)
          .set('Authorization', 'Bearer ' + adminToken)
          .expect('Content-Type', /json/)
          .expect(200)
      }, 30000)

    })