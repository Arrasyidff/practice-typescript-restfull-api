import { Address, User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, UpdateAddressRequest, toAddressResponse } from '../model/address-model'
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AddressService {

    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse>
    {
        const createRequest = Validation.validate(AddressValidation.CREATE, request)
        await ContactService.isContactExists(user.username, createRequest.contact_id)

        const address = await prismaClient.address.create({data: createRequest})
        return toAddressResponse(address)
    }

    static async isExistsAddress(id: number, contactId: number): Promise<Address>
    {
        const address = await prismaClient.address.findFirst({
            where: {id: id, contact_id: contactId
        }})
        if (!address) throw new ResponseError(404, 'Address is not found')

        return address
    }

    static async get(user: User, request: GetAddressRequest): Promise<AddressResponse>
    {
        const getRequest = Validation.validate(AddressValidation.GET, request)
        await ContactService.isContactExists(user.username, getRequest.contact_id)

        const address = await this.isExistsAddress(getRequest.id, getRequest.contact_id)
        return toAddressResponse(address)
    }

    static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse>
    {
        const updateRequest = Validation.validate(AddressValidation.UPDATE, request)
        await ContactService.isContactExists(user.username, updateRequest.contact_id)
        await this.isExistsAddress(updateRequest.id, updateRequest.contact_id)

        const address = await prismaClient.address.update({
            where: {id: updateRequest.id, contact_id: updateRequest.contact_id},
            data: updateRequest
        })

        return toAddressResponse(address)
    }

    static async remopve(user: User, request: RemoveAddressRequest): Promise<AddressResponse>
    {
        const removeRequest = Validation.validate(AddressValidation.REMOVE, request)
        await ContactService.isContactExists(user.username, removeRequest.contact_id)
        await this.isExistsAddress(removeRequest.id, removeRequest.contact_id)

        const address = await prismaClient.address.delete({
            where: {id: removeRequest.id, contact_id: removeRequest.contact_id},
        })

        return toAddressResponse(address)
    }

}