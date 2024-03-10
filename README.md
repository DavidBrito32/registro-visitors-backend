# Documentação da API Museu

Bem-vindo à documentação da API Museu. Esta API foi desenvolvida para gerenciar
o cadastro de visitantes de um museu, bem como oferecer uma dashboard acessível
apenas por usuários autorizados.

## Documentação Detalhada dos Endpoints

Para informações detalhadas sobre os endpoints disponíveis e como utilizá-los,
consulte a documentação interativa da API Museu no Postman, disponível
[aqui](https://documenter.getpostman.com/view/29849540/2sA2xh3tPZ).

## Recursos Principais

### 1. Cadastro de Visitantes

A API Museu permite o cadastro de visitantes, armazenando suas informações
pessoais de forma segura.

### 2. Confirmação de visita (para usuarios ja cadastrados)

### 3. Dashboard Restrita

Há uma dashboard disponível para visualização de dados estatísticos e relatórios
específicos, acessível apenas por usuários autorizados.

## Requisitos de Autenticação

Para acessar a dashboard restrita, é necessário autenticar-se como um usuário
autorizado, fornecendo um token JWT válido no cabeçalho de autorização.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- Programação Orientada a Objetos (POO)
- Design Patterns (DTO)
- Tokenização com [JWT](https://jwt.io/) (JSON Web Token)
- Criptografia de Senhas com Bcrypt
- Banco de Dados [SQLITE](https://www.sqlite.org/)
- Query Builder [Knex](https://knexjs.org/guide/query-builder.html)
- Arquitetura em Camadas Utilitárias e Isoladas
