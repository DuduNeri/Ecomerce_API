🛒 E-commerce API Backend
API RESTful para gerenciamento de usuários e produtos em um sistema de e-commerce, construída com Node.js, Express, Sequelize e PostgreSQL. Inclui autenticação JWT para proteger rotas.

⚙️ Tecnologias
Node.js

Express

Sequelize ORM

PostgreSQL

JSON Web Token (JWT)

bcryptjs

dotenv

🚀 Como Rodar o Projeto
Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/DuduNeri/Ecomerce_API.git
cd Ecomerce_API
Instale as dependências:

bash
Copiar
Editar
npm install
Crie um arquivo .env na raiz do projeto com as seguintes variáveis (altere os valores para seu ambiente):

ini
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
Execute o servidor em modo desenvolvimento (com hot reload):

bash
Copiar
Editar
npm run dev
Acesse a API no endereço:

arduino
Copiar
Editar
http://localhost:8000
📁 Estrutura do Projeto
bash
Copiar
Editar
src/
├── config/           # Configuração da conexão com o banco de dados
│   └── db.js
├── controllers/      # Controladores com a lógica das rotas
│   ├── productController.js
│   └── userController.js
├── middlewares/      # Middleware para autenticação JWT
│   └── authMiddleware.js
├── models/           # Modelos Sequelize para User e Product
│   ├── Product.js
│   ├── User.js
│   └── index.js
├── routes/           # Definição das rotas da API
│   ├── productRoutes.js
│   └── userRoutes.js
├── utils/            # Funções utilitárias (ex: geração de tokens)
│   └── generateTokens.js
├── app.js            # Configuração do Express e inclusão das rotas
└── server.js         # Inicialização do servidor e sincronização do banco
🔥 Funcionalidades
Usuários
Criar usuário (registro) — POST /users

Fazer login e receber token JWT — POST /login

Listar todos os usuários (sem a senha) — GET /users

Buscar usuário por ID — GET /users/:id

Atualizar usuário — PUT /users/:id (precisa de token válido)

Deletar usuário — DELETE /users/:id (precisa de token válido)

Produtos
Criar produto — POST /products (precisa de token válido)

Listar todos os produtos — GET /products

Buscar produto por ID — GET /products/:id

Atualizar produto — PUT /products/:id (precisa de token válido)

Deletar produto — DELETE /products/:id (precisa de token válido)

🔐 Autenticação
O sistema usa JWT para autenticação.

Após login, o token deve ser enviado nas requisições protegidas no header:

makefile
Copiar
Editar
Authorization: Bearer <token>
O middleware verifyToken verifica o token e libera o acesso às rotas protegidas.

📝 Exemplos de Requisições
Criar Usuário (Registro)
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
Criar Produto (autenticado)
bash
Copiar
Editar
curl -X POST http://localhost:8000/products \
-H "Authorization: Bearer <seu_token>" \
-H "Content-Type: application/json" \
-d '{"title":"Produto A","description":"Descrição do produto","price":100,"image":"url_da_imagem","category":"categoria"}'
Atualizar Produto (autenticado)
bash
Copiar
Editar
curl -X PUT http://localhost:8000/products/1 \
-H "Authorization: Bearer <seu_token>" \
-H "Content-Type: application/json" \
-d '{"title":"Produto Atualizado","description":"Nova descrição","price":150,"image":"nova_url","category":"nova_categoria"}'
Deletar Produto (autenticado)
bash
Copiar
Editar
curl -X DELETE http://localhost:8000/products/1 \
-H "Authorization: Bearer <seu_token>"
💡 Boas práticas para desenvolvimento
Sempre valide dados de entrada para evitar dados inválidos no banco.

Proteja rotas que alteram dados com autenticação e autorização.

Utilize variáveis de ambiente para dados sensíveis.

Faça tratamento de erros consistente para retornar mensagens claras.

Considere implementar testes automatizados para as rotas.

📈 Próximos Passos e Melhorias
Paginação e filtros nas listagens de produtos e usuários.

Upload de imagens (ex: AWS S3, Cloudinary).

Roles e permissões (admin, cliente, etc).

Implementar testes automatizados.

Documentação automática com Swagger ou Postman.

Melhorar segurança com rate limiting e CORS configurados.

📞 Contato
Desenvolvido por Eduardo Neri
GitHub: https://github.com/DuduNeri