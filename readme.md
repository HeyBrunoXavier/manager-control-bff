<h1 align="center">MANAGER CONTROL – Backend API</h1>

<p align="center">
  API backend construída com <strong>Node.js</strong>, <strong>Fastify</strong> e <strong>TypeScript</strong>,
  utilizando <strong>Zod</strong> para validação, <strong>Swagger</strong> para documentação
  e <strong>Drizzle ORM</strong> para acesso ao banco de dados.
</p>

<hr />

<h2>📌 Stack Tecnológica</h2>

<ul>
  <li><strong>Node.js</strong></li>
  <li><strong>Fastify</strong></li>
  <li><strong>TypeScript</strong></li>
  <li><strong>Zod</strong> + fastify-type-provider-zod</li>
  <li><strong>Swagger / Swagger UI</strong></li>
  <li><strong>Drizzle ORM</strong></li>
  <li><strong>Docker / Docker Compose</strong></li>
  <li><strong>JWT</strong> para autenticação</li>
</ul>

<hr />

<h2>📂 Estrutura do Projeto</h2>

<pre><code>
src/
├── common/
│   └── errors/
│       └── customized.error.ts
│
├── config/
│
├── db/
│
├── http/
│   ├── routes/
│   │   ├── authentication.route.ts
│   │   ├── stock.route.ts
│   │   ├── project.route.ts
│   │   └── work-order.route.ts
│   │
│   └── apps/
│       ├── authentication/
│       ├── projects/
│       ├── stocks/
│       └── work-order/
│           ├── const/
│           ├── dtos/
│           ├── repositories/
│           ├── utils/
│           ├── create-order-by-user.ts
│           └── update-order-by-user.ts
│
├── utils/
├── main.ts
</code></pre>

<p>
Cada domínio possui sua própria pasta, seguindo o padrão de
<strong>separação de responsabilidades</strong>.
</p>

<hr />

<h2>🔐 Autenticação</h2>

<p>
A API utiliza <strong>JWT</strong> para autenticação.
O token deve ser enviado no header:
</p>

<pre><code class="language-http">
Authorization: Bearer &lt;token&gt;
</code></pre>

<p>
O middleware valida:
</p>
<ul>
  <li>Existência do header Authorization</li>
  <li>Formato Bearer</li>
  <li>Decodificação do token</li>
</ul>

<hr />

<h2>🧭 Rotas da API</h2>

<h3>🔑 Authentication</h3>

<p><strong>Prefixo:</strong> <code>/v1/auth</code></p>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Rota</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/v1/auth</td>
      <td>Autentica o usuário e retorna o JWT</td>
    </tr>
  </tbody>
</table>

<hr />

<h3>📦 Stock</h3>

<p><strong>Prefixo:</strong> <code>/v1/stock</code></p>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Rota</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td>/v1/stock</td>
      <td>Lista todos os itens do estoque</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/v1/stock</td>
      <td>Cria um novo item no estoque</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/v1/stock/:id</td>
      <td>Busca um item específico</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/v1/stock/:id</td>
      <td>Atualiza um item do estoque</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/v1/stock/:id</td>
      <td>Remove um item do estoque</td>
    </tr>
  </tbody>
</table>

<hr />

<h3>📁 Project</h3>

<p><strong>Prefixo:</strong> <code>/v1/project</code></p>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Rota</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td>/v1/project</td>
      <td>Lista projetos</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/v1/project</td>
      <td>Cria um novo projeto</td>
    </tr>
  </tbody>
</table>

<hr />

<h3>🛠️ Work Order</h3>

<p><strong>Prefixo:</strong> <code>/v1/work-order</code></p>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Rota</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/v1/work-order</td>
      <td>Cria uma ordem de serviço</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/v1/work-order/:order_id</td>
      <td>Atualiza uma ordem de serviço</td>
    </tr>
  </tbody>
</table>

<hr />

<h2>📚 Swagger</h2>

<p>
A documentação interativa está disponível em:
</p>

<pre><code>
http://localhost:8081/docs
</code></pre>

<hr />

<h2>▶️ Executando o Projeto</h2>

<h3>Instalar dependências</h3>

<pre><code>
npm install
</code></pre>

<h3>Configurar variáveis de ambiente</h3>

<pre><code>
cp .env-example .env
</code></pre>

<h3>Subir ambiente</h3>

<pre><code>
npm run dev
</code></pre>

<hr />

<h2>🗄️ Drizzle Studio</h2>

<pre><code>
npx drizzle-kit studio
</code></pre>

<hr />

<h2>📄 Licença</h2>

<p>
Projeto privado — uso interno.
</p>
