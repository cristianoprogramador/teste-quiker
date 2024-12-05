# Teste Quiker - Fullstack

![image](https://github.com/user-attachments/assets/4c9d5dbb-ab2c-47e1-8485-571e22ccb39e)
![image](https://github.com/user-attachments/assets/e45c885a-2716-4baa-90e8-fa12ad65dfb8)


## Descrição

Teste Quiker é uma aplicação completa de gerenciamento de posts e comentários, composta por um frontend desenvolvido com React e TypeScript, e um backend robusto construído com NestJS e Prisma. A aplicação permite aos usuários criar, editar, visualizar e interagir com posts e comentários de forma intuitiva e eficiente. Implementa autenticação segura usando JWT, validação de dados, documentação interativa com Swagger e testes automatizados para garantir a qualidade e confiabilidade do sistema.
- Faltou apenas o envio de e-mail ao receber um novo comentário e a possibilidade do criador de post colocar uma imagem também, tenho outros projetos que fazem coisas similares, como o https://remind-me-frontend.vercel.app/ (que envia até SMS) e https://appwatch.cristianosilvadev.com/
Os repositorios estão abaixo:
* https://github.com/cristianoprogramador/app_watch_backend
* https://github.com/cristianoprogramador/remind_me-backend
* https://github.com/cristianoprogramador/mylife_dashboard (Esse projeto o usuario consegue modificar seu avatar, o que seria um upload de imagem)

## Tecnologias Utilizadas

### Frontend

* React: Biblioteca JavaScript para construir interfaces de usuário interativas e reutilizáveis.
* TypeScript: Superset do JavaScript que adiciona tipagem estática, melhorando a robustez e manutenção do código.
* Vite: Ferramenta de build rápida e otimizada para projetos frontend, proporcionando um ambiente de desenvolvimento ágil.
* Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.
* React Router DOM: Biblioteca para gerenciamento de rotas no React, facilitando a navegação entre diferentes páginas.
* Axios: Cliente HTTP para realizar requisições ao backend de forma eficiente.
* Nookies: Biblioteca para gerenciamento de cookies no lado do cliente e servidor.
* React Icons: Biblioteca de ícones populares para React, facilitando a inclusão de elementos visuais.
* ESLint: Ferramenta de linting para identificar e corrigir problemas no código.
* PostCSS: Ferramenta para transformar CSS com plugins, utilizada em conjunto com Tailwind CSS.

### Backend

* NestJS: Framework progressivo para construção de aplicações Node.js eficientes e escaláveis.
* TypeScript: Superset do JavaScript que adiciona tipagem estática, melhorando a robustez e manutenção do código.
* Prisma: ORM (Object-Relational Mapping) para gerenciamento eficiente do banco de dados com uma abordagem type-safe.
* JWT (JSON Web Tokens): Mecanismo para autenticação e autorização segura.
* Passport: Middleware de autenticação para Node.js, suportando diversas estratégias de autenticação.
* Swagger: Ferramenta para documentação interativa da API, facilitando a visualização e teste dos endpoints.
* ESLint: Ferramenta de linting para identificar e corrigir problemas no código.
* Jest: Framework de testes para garantir a qualidade e confiabilidade do código.
* Prettier: Ferramenta de formatação de código para manter a consistência estilística.
* PostCSS: Ferramenta para transformar CSS com plugins.
* Bcrypt: Biblioteca para hashing de senhas, garantindo segurança na autenticação.

## Como Inicializar o Backend

* Arquivo ENV: Você precisa colocar o DATABASE_URL="file:./dev.db" e JWT_SECRET e também JWT_EXPIRES_IN
Exemplo:
  DATABASE_URL="file:./dev.db"
  JWT_SECRET="senhasecretadasuaescolha"
  JWT_EXPIRES_IN=86400s

1. Clone o repositório:

   ```bash
   git clone https://github.com/cristianoprogramador/teste-quiker.git
   ```

2. Instale as dependências:

   ```bash
   cd backend
   npm install
   ```

3. Caso ainda não tenha feito, inicialize o Prisma no projeto:

   ```bash
   npx prisma init
   ```

4. Gerar o Cliente Prisma:

   ```bash
   npx prisma generate
   ```

5. Execute o projeto:

   ```bash
   npm run start:dev
   ```

6. Abra o navegador e acesse para consultar a documentação com Swagger:
   ```
   http://localhost:3000/api
   ```

## Como Inicializar o Frontend

1. Clone o repositório:

   ```bash
   git clone https://github.com/cristianoprogramador/teste-quiker.git
   ```

2. Instale as dependências:

   ```bash
   cd frontend
   npm install
   ```

3. Execute o projeto:

   ```bash
   npm run dev
   ```

4. Abra o navegador e acesse:
   ```
   http://localhost:5173
   ```

## Tecnologias em Detalhe

### Frontend

#### React
- React é uma biblioteca JavaScript para construir interfaces de usuário. Permite criar componentes reutilizáveis que gerenciam seu próprio estado, facilitando o desenvolvimento de aplicações complexas de maneira eficiente e escalável.

#### TypeScript
- TypeScript é um superset de JavaScript que adiciona tipagem estática ao idioma. Ajuda a identificar erros em tempo de desenvolvimento, melhorando a qualidade e a manutenibilidade do código.

#### Vite
- Vite é uma ferramenta de build que oferece um ambiente de desenvolvimento rápido e eficiente para projetos frontend. Utiliza módulos ES nativos para acelerar o processo de inicialização e recarregamento da aplicação durante o desenvolvimento.

#### Tailwind CSS
- Tailwind CSS é um framework CSS utilitário que permite estilizar componentes diretamente no markup usando classes predefinidas. Facilita a criação de designs responsivos e personalizados sem a necessidade de escrever CSS personalizado.

#### React Router DOM
- React Router DOM é uma biblioteca para gerenciamento de rotas no React. Permite definir rotas declarativamente, facilitando a navegação entre diferentes páginas e componentes na aplicação.

#### Axios
- Axios é uma biblioteca para realizar requisições HTTP. Utilizado para comunicar o frontend com o backend, facilitando operações como GET, POST, PUT e DELETE.

#### Nookies
- Nookies é uma biblioteca para gerenciamento de cookies tanto no lado do cliente quanto no servidor em aplicações Next.js e React. Simplifica o processo de criação, leitura e remoção de cookies.

#### React Icons
- React Icons é uma biblioteca que fornece uma ampla variedade de ícones populares para serem utilizados em projetos React. Facilita a inclusão de ícones vetoriais escaláveis de maneira simples e eficiente.

#### ESLint
- ESLint é uma ferramenta de linting para JavaScript e TypeScript. Analisa o código em busca de padrões problemáticos ou de estilo, ajudando a manter a consistência e a qualidade do código.

#### PostCSS
- PostCSS é uma ferramenta para transformar CSS com plugins. Utilizado em conjunto com Tailwind CSS para processar e otimizar os estilos durante o build.

### Backend

#### NestJS
- NestJS é um framework progressivo para construir aplicações Node.js eficientes, confiáveis e escaláveis. Utiliza conceitos de programação orientada a objetos, programação funcional e programação reativa.

#### TypeScript
- TypeScript é um superset de JavaScript que adiciona tipagem estática ao idioma. Ajuda a identificar erros em tempo de desenvolvimento, melhorando a qualidade e a manutenibilidade do código.

#### Prisma
- Prisma é um ORM moderno que facilita o gerenciamento do banco de dados com uma abordagem type-safe. Fornece uma interface intuitiva para interagir com o banco de dados e gerenciar migrações.

#### JWT (JSON Web Tokens)
- JWT é um padrão aberto (RFC 7519) que define uma maneira compacta e autocontida para transmitir informações seguras entre partes como um objeto JSON. Amplamente usado para autenticação e autorização.

#### Passport
- Passport é um middleware de autenticação para Node.js que suporta uma ampla variedade de estratégias de autenticação, incluindo JWT.

#### Swagger
- Swagger é uma ferramenta para documentação interativa de APIs. Permite visualizar e interagir com os endpoints da API de forma fácil e intuitiva.

#### ESLint
- ESLint é uma ferramenta de linting para JavaScript e TypeScript. Analisa o código em busca de padrões problemáticos ou de estilo, ajudando a manter a consistência e a qualidade do código.

#### Jest
- Jest é um framework de testes JavaScript que permite escrever testes unitários e de integração de forma simples e eficiente.

#### Prettier
- Prettier é uma ferramenta de formatação de código que garante a consistência estilística em todo o projeto, eliminando debates sobre formatação durante revisões de código.

#### PostCSS
- PostCSS é uma ferramenta para transformar CSS com plugins.

#### Bcrypt
- Bcrypt é uma biblioteca para hashing de senhas, garantindo que as senhas dos usuários sejam armazenadas de forma segura no banco de dados.

## Contato

Para qualquer dúvida ou sugestão, entre em contato através do cristiano_own@hotmail.com.br

Desenvolvido por Cristiano Pereira da Silva
