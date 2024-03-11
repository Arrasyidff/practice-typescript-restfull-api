import { User } from '@prisma/client'
import { CreateContactRequest, ContactResponse, toContactResponse } from '../model/contact-model'
import { ContactValidation } from '../validation/contact-validation'
import { Validation } from '../validation/validation'
import { prismaClient } from '../application/database'

export class ContactService {

    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse>
    {
        const createRequest = Validation.validate(ContactValidation.CREATE, request)

        const payload = {...createRequest, username: user.username}
        const contact = await prismaClient.contact.create({data: payload})

        return toContactResponse(contact)
    }

}