# 🛒 E-commerce API Backend

API RESTful para gerenciamento de usuários e produtos de um sistema de e-commerce. Construída com **Node.js**, **Express**, **Sequelize** e **PostgreSQL**. Inclui autenticação via **JWT**, upload de imagens com **Multer**, e validações com **Joi**.

---

## ⚙️ Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize ORM**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **bcryptjs**
- **dotenv**
- **Multer**
- **Joi**

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório:
```bash
git clone https://github.com/DuduNeri/Ecomerce_API.git
cd Ecomerce_API
2. Instale as dependências:
bash
Copiar
Editar
npm install
3. Configure o arquivo .env:
Crie um .env na raiz com os seguintes dados:

env
Copiar
Editar
PORT=8000
DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=sua_chave_secreta
SECRET_KEY=sua_chave_secreta
4. Execute o servidor:
bash
Copiar
Editar
npm start
5. Acesse a API:
http://localhost:8000

📁 Estrutura do Projeto
bash
Copiar
Editar
src/
├── config/             # Configuração do banco de dados
├── controllers/        # Lógica das rotas
├── middlewares/        # Autenticação, validações e segurança
├── models/             # Modelos Sequelize (User, Product)
├── routes/             # Arquivos de rotas
├── services/           # Lógica de negócio
├── uploads/            # Armazenamento local de imagens
├── utils/              # Funções auxiliares (ex: token)
├── validations/        # Esquemas Joi
├── app.js              # Instância do Express
└── server.js           # Inicialização do servidor
🔐 Autenticação JWT
Todas as rotas protegidas exigem o envio do token JWT no header:

http
Copiar
Editar
Authorization: Bearer <seu_token>
🔥 Funcionalidades
👥 Usuários
Método	Rota	Descrição
POST	/users	Criar novo usuário
POST	/login	Fazer login e obter token
GET	/users	Listar todos os usuários (sem senha)
GET	/users/:id	Buscar usuário por ID
PUT	/users/:id	Atualizar usuário
DELETE	/users/:id	Deletar usuário

🛍️ Produtos
Método	Rota	Descrição
POST	/products	Criar produto (autenticado)
GET	/products	Listar todos os produtos
GET	/products/:id	Buscar produto por ID
PUT	/products/:id	Atualizar produto (autenticado e dono)
DELETE	/products/:id	Deletar produto (autenticado e dono)
GET	/users/:username/products	Listar produtos por usuário
GET	/me/products	Listar produtos do usuário autenticado
GET	/products-with-owner	Listar produtos com nome do dono

🖼 Upload de Imagens
Produtos podem conter imagens via upload usando Multer.

🛠️ Validações
Utiliza Joi para validar dados de entrada de forma robusta

Previne campos vazios, tipos inválidos e dados inconsistentes

Middleware global para tratar erros de validação

📬 Exemplos de Requisições (cURL)
Criar Usuário
bash
Copiar
Editar
curl -X POST http://localhost:8000/users \
-H "Content-Type: application/json" \
-d '{"username":"eduardo","email":"edu@exemplo.com","password":"123456"}'
Login
bash
Copiar
Editar
curl -X POST http://localhost:8000/login \
-H "Content-Type: application/json" \
-d '{"email":"edu@exemplo.com","password":"123456"}'
Criar Produto (Autenticado)
bash
Copiar
Editar
curl -X POST http://localhost:8000/products \
-H "Authorization: Bearer <seu_token>" \
-H "Content-Type: application/json" \
-d '{"title":"Produto A","description":"Descrição","price":100,"image":"url_img","category":"categoria"}'
💡 Boas Práticas Implementadas
Validação com Joi

Upload com Multer

Middleware de verificação de dono

Autenticação segura com JWT

Separação entre controllers e services

Utilização de variáveis de ambiente

Tratamento de erros centralizado

📈 Próximos Passos (Sugestões de Melhoria)
Paginação e filtros em listagens

Upload de imagem para serviços externos (Cloudinary, S3)

Sistema de roles (admin/cliente)

Documentação com Swagger

Testes automatizados (Jest, Supertest)

Rate limiting, Helmet, CORS avançado

👨‍💻 Desenvolvido por
Eduardo Neri
GitHub

