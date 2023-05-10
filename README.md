# Projeto Agenda Telefônica

Este projeto é uma aplicação de agenda telefônica que usa Node.js como plataforma de desenvolvimento, Express como framework web, Prisma como ORM (Object Relational Mapping) e PostgreSQL como banco de dados relacional.

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado em sua máquina:

-   Node.js
-   PostgreSQL

## Instalação

Para instalar as dependências do projeto, basta executar o comando:

Copy code

`npm install`

## Configuração do banco de dados

Antes de executar o projeto, é necessário configurar o banco de dados PostgreSQL. Para isso, crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

makefileCopy code

`DATABASE_URL="postgresql://seu_usuario:seu_password@localhost:5432/nome_do_banco"`

Substitua `seu_usuario` e `seu_password` pelos seus dados de acesso ao PostgreSQL e `nome_do_banco` pelo nome do banco de dados que você deseja usar.

Em seguida, execute o seguinte comando para criar as tabelas do banco de dados:

Copy code

`npx prisma migrate dev`

## Executando o projeto

Para executar o projeto, basta executar o comando:

Para rodar o servidor

`node server.js`

Abra o arquvi index.html com algum liveserver

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
