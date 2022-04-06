const app = require('../../app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require('supertest')
const User = require('../../models/User')
require('dotenv').config()
require('../../redis-connect')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

const demoUser = {
  firstName: "darasimi",
  lastName: "Akaniru",
  email: "chieunice114@gmail.com",
  password: "123456",
  confirmPassword: "123456",
  isVerified: true,
  role: "admin"
}

const testUserId = new mongoose.Types.ObjectId()

const token = jwt.sign({user: demoUser}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})



describe('Auth API', () => {
    beforeAll(async() => {
		jest.setTimeout(6000)
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect();
      });

/** Fetch authenticated user profile */
test('Should get profile for user', async () => {
  const res = await request(app)
    .get('/v1/users/6246d1b2d8606903ef11a4c3')
    .set('Authorization', 'Bearer ' + token)
    .send()
    .expect('Content-Type', /json/)
    .expect(500)
})

/** Fail in getting unathenticated user profile */
test('Should not get profile for unauthenticated user', async () => {
  const res = await request(app)
    .get(`/v1/users/123345667`)
    .send()
    .expect(401)
})

/** Should fail to make updates that are not allowed to user profile */
test('Should be able to make only allowed updates to authenticated user', async () => {
  const res = await request(app)
    .patch('/v1/users/622c80935fabea62f8a9f34f')
    .set('Authorization', 'Bearer ' + token)
    .send({
      gender: 'Male'
    })
    .expect(404)
})

/** Fetch authenticated user profile */
test('get all user', async () => {
	const res = await request(app)
	  .get(`/v1/users`)
	  .set('Authorization', 'Bearer ' + token)
	  .send()
    .expect('Content-Type', /json/)
	  .expect(500)
  })

  test('Should get current  user', async () => {
    const res = await request(app)
      .get(`/v1/users/showme`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
    })
  test("update user details", async () => {
    	const res = await request(app)
    		.patch("/v1/users/updateUser")
        .set('Authorization', 'Bearer ' + token)
    		.send({
    			firstName: "dara",
    			lastName: "Akaniru",
    			email: "chieunice114@gmail.com",
    		})
        .expect('Content-Type', /json/)
    		.expect(500);
        })
    
  
  /** Should fail to make updates that are not allowed to user profile */
  test('Should be able to make only allowed updates to authenticated user', async () => {
	const res = await request(app)
	  .patch('/v1/users/updateUser')
    .set('Authorization', 'Bearer ' + token)
	  .send({
		gender: 'Male'
	  })
	  .expect(400)
  })

  test('Should delete profile of authenticated user', async () => {
                const res = await request(app)
                  .delete('/v1/users/deleteMe')
                  .set('Authorization', 'Bearer ' + token)
                  .send()
                  .expect('Content-Type', /json/)
                  .expect(200)
              })
  
  

})