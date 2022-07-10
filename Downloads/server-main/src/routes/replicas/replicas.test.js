const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const Token = require('../../models/Token')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')
require('../../redis-connect')



const testUserId = new mongoose.Types.ObjectId()
const demoReplica = {
        user: testUserId,
        nftName: "admin nft",
        tokenId: 24682468,
        userWalletAddress: "adminwallet",
        DesignUrl: "http/image.com",
        price: 50,
}


const testTokenId = new mongoose.Types.ObjectId()
const testToken = {
  _id: testTokenId,
  ...demoReplica
}

const demoUser = {
  firstName: "darasimi",
  lastName: "Akaniru",
  email: "chieunice114@gmail.com",
  password: "123456",
  confirmPassword: "123456",
  isVerified: true,
  role: "admin"
}

const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})

describe('TOKEN API', () => {
    beforeAll(async() => {
		jest.setTimeout(6000)
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect();
      });

      test('Should create new replica', async ()  => {
        const res = await request(app)
          .post('/v1/replica')
          .set('Authorization', 'Bearer ' + token)
          .send(demoReplica)
          .expect('Content-Type', /json/)
          .expect(201)
      })
      
      
      /**
       * Testing GET token by id
       */
      
      test('Should get single replica by id', async () => {
        const res = await request(app)
        .get(`/v1/replica/624af651f00b88fbb7880c0e`)
        .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)

      })

      // test('Should update the token data', async (done) => {
      //   const res = await request(app)
      //     .patch(`/post/${testPostId}`)
      //     .set('Authorization', 'Bearer ' + token)
      //     .send(updatePost)
              //.expect('Content-Type', /json/)
      //     .expect(HttpStatus.OK)
      //   done()
      // })
      
      /**
       * Testing get post of a particular user
       */
      
      test('Should retrieve all replicas created by a user', async ()  => {
        const res = await request(app)
          .get(`/v1/replica/`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
        
      })

      test('Should retrieve all replicas', async ()  => {
        const res = await request(app)
          .get(`/v1/replica/`)
          .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
        
      })


      /**
       * Testing token deletion
       */
      
       test('Should delete replica', async () => {
        const res = await request(app)
        .delete(`/v1/replica/624da3f0483fe90cca454245`)
        .set('Authorization', 'Bearer ' + token)
          .send()
          .expect('Content-Type', /json/)
          .expect(200)
  
      })

    })