# my-bank-api-nodejs-mongo
Projeto de API em NodeJS, utilizando MongoDB.
Trabalho desenvolvido para a Pós graduação em Front-end da [IGTI](https://www.igti.com.br/).


## Instalação
```bash
$ npm install
```


## Rodando o projeto
```bash
$ npm run dev
```

## Endpoints

### Criando uma conta
Endpoint: **POST** - `/api/account/create`

Body:
```json
{
  "name": "Geisiane",
  "balance": 100.0
}
```

Resultado:
```json
{
  "message": "Conta criada com sucesso!",
  "data": {
    "_id": "5f680b86c3e2d21d18145229",
    "name": "Geisiane",
    "balance": 100.0
  }
}
```


### Fazendo um deposito
Endpoint: **PUT** - `/api/account/deposit/:id`

Body:
```json
{
  "balance": 50.0
}
```

Resultado:
```json
{
  "message": "Depósito de R$ 50.00 para Geisiane foi realizado com sucesso!",
  "accountBalance": 150.0
}
```


### Fazendo um saque
Endpoint: **PUT** - `/api/account/withdraw/:id`

**Body:**
```json
{
  "balance": 50.0
}
```

**Resultado:**
```json
{
  "message": "Seu saque de R$ 50.00 realizado com sucesso!",
  "accountBalance": 100.0
}
```


### Verificar saldo da conta
Endpoint: **GET** - `/api/account/check/:id`

**Resultado:**
```json
{
  "message": "Seu seu saldo é de R$ 100.00",
  "accountBalance": 100.0
}
```


### Deletar conta
Endpoint: **DELETE** - `/api/account/delete/:id`

**Resultado:**
```json
{
  "message": "A conta número 1 foi removida com sucesso"
}
```