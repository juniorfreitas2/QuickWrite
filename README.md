# QuickWrite API

API construída com **NestJS + TypeORM + PostgreSQL**, com autenticação **JWT**, controle de usuários e permissões, e arquitetura modular.

---

## Tecnologias

- Node.js 20+
- NestJS 10+
- TypeORM 0.3+
- PostgreSQL 16
- JWT para autenticação
- Docker & Docker Compose
- bcrypt para hash de senhas

---

## Estrutura do Projeto

```text
src/
├── auth/           # Login, JWT, guards e serviços de autenticação
├── bootstrap/      # Serviço de inicialização (criação de usuário root)
├── permissions/    # Entidade e módulo de permissões
├── users/          # Entidade, módulo e CRUD de usuários
├── articles/       # Entidade, módulo e CRUD de artigos
├── app.module.ts   # Módulo raiz
├── main.ts         # Ponto de entrada
```

---

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=quickwrite_db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=quickwrite
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
PORT=3000
```

---

## Rodando com Docker

```bash
docker compose up --build
```

O projeto será iniciado na porta **3000**.

---

## Rotas da API

### Auth

```text
POST /api/auth/login
Body JSON:
{
"email": "user@mail.com",
"password": "123456"
}
```

Retorna:

```json
{
"access_token": "jwt_token_aqui"
}
```

---

### Users (Admin Only)

```text
GET /api/users
```
Listar todos os usuários.

```text
GET /api/users/:id
```
Buscar usuário por ID.

```text
POST /api/users
Body JSON:
{
"name": "Nome do Usuário",
"email": "user@mail.com",
"password": "123456",
"permissionId": 1
}
```

```text
PUT /api/users/:id
Body JSON:
{
"name": "Novo Nome",
"email": "novo@mail.com",
"password": "123456",
"permissionId": 2
}
```

```text
DELETE /api/users/:id
```
Remover usuário.

---

### Articles

```text
GET /api/articles
```
Listar todos os artigos.

```text
GET /api/articles/:id
```
Buscar artigo por ID.

```text
POST /api/articles
Body JSON:
{
"title": "Título do Artigo",
"content": "Conteúdo do artigo"
}
```

```text
PUT /api/articles/:id
Body JSON:
{
"title": "Novo Título",
"content": "Novo conteúdo"
}
```

```text
DELETE /api/articles/:id
```
Remover artigo.

---

## Permissões

| Nível     | Ações Permitidas                          |
|-----------|-------------------------------------------|
| Admin     | CRUD de usuários e artigos                |
| Editor    | CRUD apenas de artigos                     |
| Reader    | Apenas leitura de artigos                  |

---

## Observações

- A autenticação utiliza JWT e o token deve ser enviado no header:

```http
Authorization: Bearer <token>
```

- O usuário **root** é criado automaticamente no bootstrap:  
  `email: web.juniorfreitas@gmail.com`, `password: root123`

- Banco de dados configurado para **PostgreSQL** e inicializado automaticamente pelo NestJS com `synchronize: true`.

---

## Exemplos de requisições curl

Login:

```bash
curl -X POST http://localhost:3000/api/auth/login 
-H "Content-Type: application/json" 
-d '{"email":"web.juniorfreitas@gmail.com","password":"root123"}'
```

Listar usuários (com token):

```bash
curl -X GET http://localhost:3000/api/users 
-H "Authorization: Bearer <token>"
```

Criar artigo:

```bash
curl -X POST http://localhost:3000/api/articles \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"title":"Meu Artigo","content":"Conteúdo do artigo"}'
```
