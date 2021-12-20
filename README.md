# Teste Técnico Meu Guru

## Como rodar

```bash
docker-compose build
docker-compose up
```

## Rotas

### Listar todos os usuários
```bash
GET - /users
```

### Filtrar usuários por nome ou email
```bash
GET - /users?filter=AlgumNome
```

### Paginação
```bash
GET - /users?page=1&limit=10
```

### Salvar um usuário
```bash
POST - /users

body {
    "name": "Nome do usuário"
    "email": "emaildousuario@email.com"
    "password": "12345"
}
```

### Atualizar um usuário
```bash
PUT - /users/:id

body {
    "name": "Nome do usuário"
    "email": "emaildousuario@email.com"
    "password": "12345"
}
```

### Deletar um usuário
```bash
DELETE - /users/:id
```