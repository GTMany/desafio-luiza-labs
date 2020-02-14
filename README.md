# Desafio-luiza-labs / Wishlist
API rest para gerenciar os produtos favoritos dos clientes da Magazine Luiza.

Esta api está aberta ao mundo e encontra-se [aqui](http://34.69.163.46/), porém, é necessário se autenticar para estar autorizado afim de consumi-las.

Clique [aqui](documentacao-api.md) para acessar a Documentação da API.


Técnologias utilizadas

- Linugagem de programação:
    - NodeJS/11.13.0
- Banco de dados:
    - PostgreSQL
- Dependências:
    - Express
        - Utilizado para construir o esqueleto do projeto (servidor e rotas)
    - Axios
        - Utilizado para fazer chamadas HTTP em outros microserviços.
    - Jsonwebtoken
        - Utilizado para criar a chave de autenticação
    - Pg
        - Utilizado para estabelecer e gerenciar a conexão com o banco de dados
- Publicação:
    - Docker
    - Google Cloud Platform


## Configuração e publicação da aplicação:

No diretório raiz do projeto, executar os seguintes comandos: 
```
npm install
npm start

```
## Base de dados

- Executar o sh `startDB.sh` para iniciar a base de dados em PostgreSQL
- Os scripts utilizados para a criação das tabelas se encontram em: `src/db`