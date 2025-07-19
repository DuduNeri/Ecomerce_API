# 🛒 E-commerce API Backend

API RESTful para gerenciamento de usuários e produtos em um sistema de e-commerce, construída com Node.js, Express, Sequelize e PostgreSQL. Inclui autenticação JWT para proteger rotas.

## ⚙️ Tecnologias
- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- JSON Web Token (JWT)
- bcryptjs
- dotenv

## 🚀 Como Rodar o Projeto
## 1. Clone o repositório:
```bash
git clone https://github.com/DuduNeri/Ecomerce_API.git
cd Ecomerce_API

## 2. Instale as dependências:
bash
npm install

## 3. Crie um arquivo .env na raiz com:

ini
PORT=8000
DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=sua_chave_secreta
SECRET_KEY=sua_chave_secreta

## 4. Execute o servidor:

bash
npm start 

5. Acesse:

text
http://localhost:8000

## 6. 📁 Estrutura do Projeto
text
src/
├── config/           # Configuração do banco de dados
│   └── db.js
├── controllers/      # Lógica das rotas
│   ├── productController.js
│   └── userController.js
├── middlewares/      # Autenticação JWT
│   └── authMiddleware.js
├── models/           # Modelos Sequelize
│   ├── Product.js
│   ├── User.js
│   └── index.js
├── routes/           # Rotas da API
│   ├── productRoutes.js
│   └── userRoutes.js
├── utils/            # Utilitários
│   └── generateTokens.js
├── app.js            # Configuração do Express
└── server.js         # Inicialização do servidor

🔥 Funcionalidades
👥 Usuários
POST /users - Criar usuário

POST /login - Login (retorna token JWT)

GET /users - Listar todos usuários (sem senha)

GET /users/:id - Buscar usuário por ID

PUT /users/:id - Atualizar usuário (token obrigatório)

DELETE /users/:id - Deletar usuário (token obrigatório)

🛍️ Produtos
POST /products - Criar produto (token obrigatório)

GET /products - Listar todos produtos

GET /products/:id - Buscar produto por ID

PUT /products/:id - Atualizar produto (token obrigatório)

DELETE /products/:id - Deletar produto (token obrigatório)

🔐 Autenticação
Envie o token JWT no header das requisições protegidas:

makefile
Authorization: Bearer <token>
📝 Exemplos de Requisições
Criar Usuário
bash
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{"username":"eduardo","email":"edu@exemplo.com","password":"123456"}'
Login
bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"edu@exemplo.com","password":"123456"}'
Criar Produto (Autenticado)
bash
curl -X POST http://localhost:8000/products \
  -H "Authorization: Bearer <seu_token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Produto A","description":"Descrição","price":100,"image":"url_imagem","category":"categoria"}'
💡 Boas Práticas
Valide sempre dados de entrada

Proteja rotas críticas com autenticação

Use variáveis de ambiente para dados sensíveis

Implemente tratamento de erros consistente

Considere adicionar testes automatizados

📈 Próximos Passos
Paginação/filtros em listagens

Upload de imagens (AWS S3/Cloudinary)

Sistema de roles (admin/cliente)

Testes automatizados

Documentação com Swagger

Rate limiting e CORS aprimorados

Desenvolvido por Eduardo Neri