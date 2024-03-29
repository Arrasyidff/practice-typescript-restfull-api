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

})

describe('GET /api/contacts/:contactId', () => {

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

describe('PUT /api/contacts/:contactId', () => {

    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be update contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
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
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
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
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
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

describe('DELETE /api/contacts/:contactId', () => {

    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be update contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('OK')
    })

    it('should be reject if wrong token', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test1')

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })

    it('should be reject if empty data', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(404)
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

    it('should be abel to search contact', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.pagging.current_page).toBe(1)
        expect(response.body.pagging.total_page).toBe(1)
        expect(response.body.pagging.size).toBe(10)
    })

    it('should be abel to search contact with query name', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .query({name: 'st'})
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.pagging.current_page).toBe(1)
        expect(response.body.pagging.total_page).toBe(1)
        expect(response.body.pagging.size).toBe(10)
    })

    it('should be abel to search contact with query email', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .query({email: '.com'})
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.pagging.current_page).toBe(1)
        expect(response.body.pagging.total_page).toBe(1)
        expect(response.body.pagging.size).toBe(10)
    })

    it('should be abel to search contact with query phone', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .query({phone: '1'})
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.pagging.current_page).toBe(1)
        expect(response.body.pagging.total_page).toBe(1)
        expect(response.body.pagging.size).toBe(10)
    })

    it('should be abel to search contact with query phone empty search', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .query({phone: '0'})
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(0)
        expect(response.body.pagging.current_page).toBe(1)
        expect(response.body.pagging.total_page).toBe(1)
        expect(response.body.pagging.size).toBe(10)
    })

    it('should be abel to search contact with pagging', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .query({page: 2, size: 1})
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(0)
        expect(response.body.pagging.current_page).toBe(2)
        expect(response.body.pagging.total_page).toBe(1)
        expect(response.body.pagging.size).toBe(1)
    })

})