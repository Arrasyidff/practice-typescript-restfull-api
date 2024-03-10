import supertest from 'supertest'
import { web } from '../src/application/web'
import { logger } from '../src/application/logging'
import { UserTest } from './test-util'
import bcrypt from 'bcrypt'

describe('POST /api/users', () => {

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should reject register new user if request invalid', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should register new user', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'test',
                name: 'test'
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('test')
        expect(response.body.data.name).toBe('test')
        expect(response.body.data.password).toBeUndefined()
    })

})

describe('POST /api/users/login', () => {

    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to login', async () => {
        const response = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'test'
            })

            logger.debug(response.body)
            expect(response.status).toBe(200)
            expect(response.body.data.username).toBe('test')
            expect(response.body.data.name).toBe('test')
            expect(response.body.data.token).toBeDefined()
    })

    it('should be reject login user if username is wrong', async () => {
        const response = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test1',
                password: 'test'
            })

            logger.debug(response.body)
            expect(response.status).toBe(401)
            expect(response.body.errors).toBeDefined()
    })

    it('should be reject login user if password is wrong', async () => {
        const response = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'test1'
            })

            logger.debug(response.body)
            expect(response.status).toBe(401)
            expect(response.body.errors).toBeDefined()
    })

})

describe('GET /api/users/current', () => {

    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to get user', async () => {
        const response = await supertest(web)
            .get('/api/users/current')
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('test')
        expect(response.body.data.name).toBe('test')
    })

    it('should be reject to get user when token is invalid', async () => {
        const response = await supertest(web)
            .get('/api/users/current')
            .set('X-API-TOKEN', 'test1')

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined
    })

})

describe('PATCH /api/users/current', () => {

    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be reject to update user if is invalid request', async () => {
        const response = await supertest(web)
            .patch('/api/users/current')
            .set('X-API-TOKEN', 'test')
            .send({
                name: '',
                password: ''
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should be reject to update user if is token is wrong', async () => {
        const response = await supertest(web)
            .patch('/api/users/current')
            .set('X-API-TOKEN', 'test1')
            .send({
                name: '',
                password: ''
            })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })

    it('should be able to update user name', async () => {
        const response = await supertest(web)
            .patch('/api/users/current')
            .set('X-API-TOKEN', 'test')
            .send({
                name: 'benar'
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe('benar')
    })

    it('should be able to update user password', async () => {
        const response = await supertest(web)
            .patch('/api/users/current')
            .set('X-API-TOKEN', 'test')
            .send({
                password: 'benar'
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)

        const user = await UserTest.get()
        expect(await bcrypt.compare('benar', user.password)).toBeTruthy()
    })

})

describe('DELETE /api/users/current', () => {

    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be reject to delete user if is invalid token', async () => {
        const response = await supertest(web)
            .delete('/api/users/current')
            .set('X-API-TOKEN', 'test1')
            .send({
                name: '',
                password: ''
            })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })

    it('should be able to update user name', async () => {
        const response = await supertest(web)
            .delete('/api/users/current')
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('OK')

        const user = await UserTest.get()
        expect(user.token).toBeNull()
    })

})