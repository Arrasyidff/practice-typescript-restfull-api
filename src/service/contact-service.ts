import { Contact, User } from '@prisma/client'
import { CreateContactRequest, ContactResponse, toContactResponse, UpdateContactRequest, SearchContactRequest } from '../model/contact-model'
import { ContactValidation } from '../validation/contact-validation'
import { Validation } from '../validation/validation'
import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import { PageAble } from '../model/page'

export class ContactService {

    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse>
    {
        const createRequest = Validation.validate(ContactValidation.CREATE, request)

        const payload = {...createRequest, username: user.username}
        const contact = await prismaClient.contact.create({data: payload})

        return toContactResponse(contact)
    }

    static async isContactExists(username: string, contactId: number): Promise<Contact>
    {
        const contact = await prismaClient.contact.findUnique({where: {id: contactId, username: username}})
        if (!contact) throw new ResponseError(404, 'Contact is not found')

        return contact
    }

    static async get(user: User, contactId: number): Promise<ContactResponse>
    {
        const contact = await this.isContactExists(user.username, contactId)
        return toContactResponse(contact)
    }

    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse>
    {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request)
        await this.isContactExists(user.username, updateRequest.id)

        const contact = await prismaClient.contact.update({
            where: {id: updateRequest.id, username: user.username},
            data: updateRequest
        })

        return toContactResponse(contact)
    }

    static async remove(user: User, contactId: number): Promise<ContactResponse>
    {
        await this.isContactExists(user.username, contactId)

        const contact = await prismaClient.contact.delete({where: {id: contactId, username: user.username}})
        return toContactResponse(contact)
    }

    static async search(user: User, request: SearchContactRequest): Promise<PageAble<ContactResponse>>
    {
        const searchRequest = Validation.validate(ContactValidation.SEARCH, request)

        const filters = []
        if (request.name) filters.push({OR: [
            {first_name: {contains: searchRequest.name}},
            {last_name: {contains: searchRequest.name}}
        ]})
        if (request.email) filters.push({email: {contains: searchRequest.email}})
        if (request.phone) filters.push({phone: {contains: searchRequest.phone}})
        let whereOptions = {username: user.username}
        if (filters.length != 0) whereOptions = {...whereOptions, ...{AND: filters}}

        const skip = (searchRequest.page - 1) * searchRequest.size
        const contacts = await prismaClient.contact.findMany({
            where: whereOptions,
            take: searchRequest.size,
            skip
        })

        const contactsTotal = await prismaClient.contact.count({where: {username: user.username}})

        return {
            data: contacts.map(contact => toContactResponse(contact)),
            pagging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(contactsTotal / searchRequest.size),
                size: searchRequest.size
            }
        }
    }

}