import { NestFactory } from '@nestjs/core';
import { writeFileSync } from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../app.module';
import { version } from '../../package.json';

async function generateSwagger() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api Swagger')
    .setDescription('Implementation swagger docs')
    .setVersion(version)
    .setExternalDoc(
      'Tech DOC',
      'https://arquiteturaestacio.visualstudio.com/JUCA/_wiki/wikis/JUCA.wiki/22555/-DOC-missoes-recompensas-edge',
    )
    .setContact(
      'YDUQS',
      'https://arquiteturaestacio.visualstudio.com/JUCA/_wiki/wikis/JUCA.wiki/22390/-Cerebrum-Tech-2025',
      'tarcisio@yduqs.com.br',
    )
    .addTag('user', 'Collection of user endpoints')
    .addTag('app', 'Collection of service endpoints such as healthcheck')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  writeFileSync('./swagger.json', JSON.stringify(documentFactory(), null, 2));

  await app.close();
}

generateSwagger();
