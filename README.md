  <p align="center">Guilda de Backend - Documentação com Swagger P1 - 28 Mar 2025<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

Guilda voltada a overview e práticas iniciais com Swagger

## Project start
Se você quer criar o projeto do zero usando NestJS os passos são esses.

```bash
# Criando num novo projeto com o Nest
nest new guilda-swagger

# Criando um crud chamado users com o Nest
nest g res subjects

# Adicionando a dependência do Swagger ao projeto.
npm install --save @nestjs/swagger
```

## Swagger dependency install error
Se você está tendo problemas em adicionar a versão do Swagger no seu projeto, siga esses passos.

```bash
# Atualize seu nestJS
ncu -u -f /^@nestjs/

# Remova o node-modules e o package-lock.json
rm -rf node_modules
rm package-lock.json

# Adicionando a dependência do Swagger ao projeto.
npm install --save @nestjs/swagger

# Execute novamente o npm install
npm install
```


## Project run

```bash
# start
$ npm run start

# start with watch mode
$ npm run start:dev
```

## Run Swagger playground
Abra seu browser e acesso seu endereço local: [http://0.0.0.0:3000/api](http://0.0.0.0:3000/api)

## Resources

- [Swagger OpenAI Specifications](https://swagger.io/specification/).
- [Swagger Codegen](https://swagger.io/tools/swagger-codegen/)
- [Documentacão do OpenAPI no Nest](https://docs.nestjs.com/openapi/introduction)
- Ferramenta de Score de OpenAPI [PB33F.io](https://pb33f.io).


## Stay in touch

- Michael Colla - Chat Teams: [michael.colla@yduqs.com.br](https://teams.microsoft.com/l/chat/0/0?users=michael.colla@yduqs.com.br)
- Rico Vilela - Chat Teams: [ricardo.pena@yduqs.com.br](https://teams.microsoft.com/l/chat/0/0?users=ricardo.pena@yduqs.com.br)
- Gabriel Rabello - Chat Teams: [gabrielr.menezes@yduqs.com.br](https://teams.microsoft.com/l/chat/0/0?users=gabrielr.menezes@yduqs.com.br)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
