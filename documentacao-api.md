# Desafio Técnico - LuizaLabs/Magalu

Esta documentação descreve a estrutura da API de produtos favoritos dos clientes da Magazine Luiza.

## Autenticação
URL: `http://34.69.163.46/login`

Método HTTP: **`POST`**

informar no corpo da requisição os seguintes campos:

- `price`: preço do produto
- `image`: URL da imagem do produto

Ex:
{
	"user": "luiza",
	"pwd": "123"
}

## Cliente

### Visualizar Cliente

Método utilizado para visualizar clientes informando um `ID`

Método HTTP: **`GET`**

URL: `http://34.69.163.46/cliente?id_cliente={ID_DO_CLIENTE}`

### Adicionar Cliente

URL: `http://34.69.163.46/cliente`

Método HTTP: **`POST`**

informar no corpo da requisição os seguintes campos:

- `nome`: Nome do cliente `(texto)`
- `email`: Email do cliente `(texto)`

Ex:
{
	"nome": "Emanuel de Sousa",
	"email": "manuel.sousa18@hotmail.com"
}

### Atualizar Cliente

URL: `http://34.69.163.46/cliente`

Método HTTP: **`PUT`**

informar no corpo da requisição os seguintes campos:

- `id`: id do cliente `(inteiro)`
- `nome`: Nome do cliente `(texto)`
- `email`: Email do cliente `(texto)`

Ex:
{
    "id", 1
	"nome": "Emanuel de Sousa",
	"email": "manuel.sousa18@hotmail.com"
}

### Remover Cliente
Método utilizado para remover clientes informando um `ID`;

Método HTTP: **`DELETE`**

URL: `http://34.69.163.46/clente?id_cliente={ID_DO_CLIENTE}`

## Wishlist

### Visualizar lista de desejos de um cliente

Método utilizado para visualizar a lista de desejos de um cliente informando o `ID`;

Método HTTP: **`GET`**

URL: `http://34.69.163.46/wishlist?id_cliente={ID_DO_CLIENTE}`

### Adicionando produtos na lista de desejos de um cliente

URL: `http://34.69.163.46/wishlist`

Método HTTP: **`POST`**

informar no corpo da requisição os seguintes campos:

- `id_cliente`: id do cliente `(inteiro)`
- `id_produto`: id do produto `(texto)`

Ex:
{
	"id_cliente": 1,
	"id_produto": "1bf0f365-fbdd-4e21-9786-da459d78dd1f"
}