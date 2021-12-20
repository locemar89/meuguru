import { createConnection, createConnections } from 'typeorm'

createConnection({
    "type": "postgres",
    "host": "dbpostgres",
    "port": 5432,
    "username": "admin",
    "password": "12345",
    "database": "meuguru",
    "synchronize": true,
    "entities": [
        "src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
        "src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/modules/**/infra/typeorm/entities",
        "migrationsDir": "src/shared/infra/typeorm/migrations"
    }
 })