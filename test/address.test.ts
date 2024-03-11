import supertest from 'supertest'
import { web } from '../src/application/web'
import { logger } from '../src/application/logging'
import { AddressTest, ContactTest, UserTest } from './test-util'
import bcrypt from 'bcrypt'

describe('POST /api/contacts/:contactId/addresses', () => {

    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to create address', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: 'JL. Merta Agung No. 55',
                city: 'Badung',
                province: 'Bali',
                country: 'Indonesia',
                postal_code: '80361'
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.street).toBe('JL. Merta Agung No. 55')
        expect(response.body.data.city).toBe('Badung')
        expect(response.body.data.province).toBe('Bali')
        expect(response.body.data.country).toBe('Indonesia')
        expect(response.body.data.postal_code).toBe('80361')
    })

    it('should be reject to create address if request is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: 'JL. Merta Agung No. 55',
                city: 'Badung',
                province: 'Bali',
                country: '',
                postal_code: ''
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should be reject to create address if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id + 1}/addresses`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: 'JL. Merta Agung No. 55',
                city: 'Badung',
                province: 'Bali',
                country: 'Indonesia',
                postal_code: '80361'
            })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

})

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {

    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to get address', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(address.id)
        expect(response.body.data.street).toBe(address.street)
        expect(response.body.data.city).toBe(address.city)
        expect(response.body.data.province).toBe(address.province)
        expect(response.body.data.country).toBe(address.country)
        expect(response.body.data.postal_code).toBe(address.postal_code)
    })

    it('should be reject to get address if contact is not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    it('should be reject to get address if address is not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

})