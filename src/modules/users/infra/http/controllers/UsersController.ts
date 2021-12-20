import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance, instanceToPlain } from "class-transformer";

import CreateUserService from '../../../services/CreateUserService'
import FindUsersService from '../../../services/FindUsersService'
import UpdateUserService from '../../../services/UpdateUserService'
import DeleteUserService from '../../../services/DeleteUserService'
import AppError from '../../../../../shared/errors/AppError'

export default class UserController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body

        const createUser = container.resolve(CreateUserService)

        const user = await createUser.execute({
            name,
            email,
            password,
        })

        return res.status(200).json(instanceToPlain(user))
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { page, limit, filter } = req.query

        const findUser = container.resolve(FindUsersService)

        const user = await findUser.execute({ 
            filter: filter?.toString(), 
            page: page?.toString(), 
            limit: limit?.toString()
        })

        return res.status(200).json(instanceToPlain(user))
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { 
            params: { id }, 
            body: { 
                name, 
                email, 
                password 
            } 
        } = req

        const updateUser = container.resolve(UpdateUserService)

        const user = await updateUser.execute({ 
            id,
            name,
            email,
            password,
            })

            return res.status(200).json(instanceToPlain(user))
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        const deleteUser = container.resolve(DeleteUserService)

        const message = await deleteUser.execute({ id })

        return res.status(200).json({ message })
    }
}