import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { pagination } from 'typeorm-pagination'

import AppError from './shared/errors/AppError'

import routes from './shared/infra/http/routes'

import './shared/infra/typeorm'
import './shared/container'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(pagination)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})