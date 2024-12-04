# Backend

## Descrição

Este é o backend da aplicação de gerenciamento de posts e comentários. Desenvolvido com NestJS e Prisma, o backend fornece uma API robusta e segura para a criação, atualização, exclusão e gerenciamento de posts e comentários. Ele implementa autenticação JWT, validação de dados, documentação Swagger e testes automatizados para garantir a qualidade e a confiabilidade do sistema.

## Tecnologias Utilizadas

NestJS: Framework progressivo para construção de aplicações Node.js eficientes e escaláveis.
TypeScript: Superset do JavaScript que adiciona tipagem estática, melhorando a robustez e a manutenção do código.
Prisma: ORM (Object-Relational Mapping) para gerenciamento eficiente do banco de dados.
JWT (JSON Web Tokens): Mecanismo para autenticação e autorização segura.
Passport: Middleware de autenticação para Node.js.
Swagger: Ferramenta para documentação interativa da API.
ESLint: Ferramenta de linting para identificar e corrigir problemas no código.
Jest: Framework de testes para garantir a qualidade do código.
Prettier: Ferramenta de formatação de código para manter a consistência estilística.
PostCSS: Ferramenta para transformar CSS com plugins.
Bcrypt: Biblioteca para hashing de senhas, garantindo segurança na autenticação.

## Como Inicializar o Projeto

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

## Tecnologias em Detalhe

NestJS
NestJS é um framework progressivo para construir aplicações Node.js eficientes, confiáveis e escaláveis. Ele utiliza conceitos de programação orientada a objetos, programação funcional e programação reativa.

TypeScript
TypeScript é um superset de JavaScript que adiciona tipagem estática ao idioma. Ele ajuda a identificar erros em tempo de desenvolvimento, melhorando a qualidade e a manutenibilidade do código.

Prisma
Prisma é um ORM moderno que facilita o gerenciamento do banco de dados com uma abordagem type-safe. Ele fornece uma interface intuitiva para interagir com o banco de dados e gerenciar migrações.

JWT (JSON Web Tokens)
JWT é um padrão aberto (RFC 7519) que define uma maneira compacta e autocontida para transmitir informações seguras entre partes como um objeto JSON. É amplamente usado para autenticação e autorização.

Passport
Passport é um middleware de autenticação para Node.js que suporta uma ampla variedade de estratégias de autenticação, incluindo JWT.

Swagger
Swagger é uma ferramenta para documentação interativa de APIs. Ele permite que você visualize e interaja com os endpoints da sua API de forma fácil e intuitiva.

ESLint
ESLint é uma ferramenta de linting para JavaScript e TypeScript. Ele analisa o código em busca de padrões problemáticos ou de estilo, ajudando a manter a consistência e a qualidade do código.

Jest
Jest é um framework de testes JavaScript que permite escrever testes unitários e de integração de forma simples e eficiente.

Prettier
Prettier é uma ferramenta de formatação de código que garante a consistência estilística em todo o projeto, eliminando debates sobre formatação durante revisões de código.

Bcrypt
Bcrypt é uma biblioteca para hashing de senhas, garantindo que as senhas dos usuários sejam armazenadas de forma segura no banco de dados.

## Contato

Para qualquer dúvida ou sugestão, entre em contato através do cristiano_own@hotmail.com.br

Desenvolvido por Cristiano Pereira da Silva
