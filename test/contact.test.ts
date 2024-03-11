import supertest from 'supertest'
import { web } from '../src/application/web'
import { logger } from '../src/application/logging'
import { ContactTest, UserTest } from './test-util'

describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be create new contact', async () => {
        const response = await supertest(web)
            .post('/api/contacts')
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: 'Arrasyid',
                last_name: 'Fadel Fatonsyah',
                email: 'aff.anton20@gmail.com',
                phone: '1111',
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.first_name).toBe('Arrasyid')
        expect(response.body.data.last_name).toBe('Fadel Fatonsyah')
        expect(response.body.data.email).toBe('aff.anton20@gmail.com')
        expect(response.body.data.phone).toBe('1111')
    })

    it('should be reject if wrong token', async () => {
        const response = await supertest(web)
            .post('/api/contacts')
            .set('X-API-TOKEN', 'test1')
            .send({
                first_name: '',
                last_name: 'Fadel Fatonsyah',
                email: 'aff.anton20@gmail.com',
                phone: '1111',
            })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })

    it('should be reject if empty first_name', async () => {
        const response = await supertest(web)
            .post('/api/contacts')
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: '',
                last_name: 'Fadel Fatonsyah',
                email: 'aff.anton20@gmail.com',
                phone: '1111',
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should be reject if empty first_name', async () => {
        const response = await supertest(web)
            .post('/api/contacts')
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: '',
                last_name: 'Fadel Fatonsyah',
                email: 'aff.anton20@gmail.com',
                phone: '1111',
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

})

describe('GET /api/contacts', () => {

    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able get contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.email).toBe(contact.email)
        expect(response.body.data.phone).toBe(contact.phone)
    })

    it('should be reject if wrong token', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test1')

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })

    it('should be reject if wrong id', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

})