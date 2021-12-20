import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

import authConfig from "@config/auth"

import AppError from '../../../../shared/errors/AppError'

interface ITokenPayload {
    iat: number;
    ext: number;
    sub: string;
}

export default function auth(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError('Unathorized', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const decode = verify(token, authConfig.jwt.secret)

        const { sub } = decode as ITokenPayload

        req.user = {
            id: sub,
        }

        return next()
    } catch (err) {
        
    }
}