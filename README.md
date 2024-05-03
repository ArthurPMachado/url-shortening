# Url-shortening app

## Um app Nest para encurtar urls

## Tecnologias

* NodeJS
* NestJS
* Prisma
* Docker e docker-compose
* JWT
* Vitest + Supertest
* Zod
* Husky

## Começando
### Pre-requisitos

Para rodar este projeto, é necessário preparar o seu ambiente, isso significa que precisa:

1. Instalar NodeJS 20+ - https://nodejs.org/en
2. Baixar e instalar o Docker - https://www.docker.com/products/docker-desktop/

### Instalando
**Clonando o Repositório**
```
$ git clone git@github.com:ArthurPMachado/url-shortening.git

$ cd url-shortening
```
**Instalando dependências**

```
$ pnpm i
```
### Adicionando variáveis de ambiente
Para este projeto, temos 4 váriaveis de ambiente: Porta, Url do Postgres, chave publica
e privada para o JWT
A porta é opcional, sendo neste caso o valor de 3000
A Url do Postgres já é o mesmo do arquivo .env.example
Já para as chaves publica e privada, estas precisam ser geradas, neste caso podemos
usar o site https://cryptotools.net/rsagen. A partir dele, copiamos o valor das
chaves em suas respectivas variaveis

### Rodando o projeto

**Iniciando docker**
```
$ docker-compose up -d
```

Nesta etapa ocorrerá o build da imagem mais enxuta, pode-se levar entre 1 a 2 minutos
para finalizar. Quando terminar, a aplicação estará pronta para uso

# Autor

👤 **Arthur Machado**

- Github: [@Arthur Machado](https://github.com/ArthurPMachado)
- LinkedIn: [@Arthur Machado](https://linkedin.com/in/arthurpmachado)
