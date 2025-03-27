import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api Swagger')
    .setDescription('Implementation swagger docs')
    .setVersion('1.0')
    // .setExternalDoc(
    //   'Link documentacão técnica',
    //   'https://arquiteturaestacio.visualstudio.com/JUCA/_wiki/wikis/JUCA.wiki/22555/-DOC-missoes-recompensas-edge',
    // )
    // .setContact(
    //   'Cerebrum',
    //   'https://arquiteturaestacio.visualstudio.com/JUCA/_wiki/wikis/JUCA.wiki/22390/-Cerebrum-Tech-2025',
    //   'Team',
    // )
    // .addServer('0.0.0.0:3000', 'local')
    // .addTag('Subjects', 'Disciplinas da grade curricular')
    .addTag('Subjects')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // writeFileSync('./swagger.json', JSON.stringify(documentFactory(), null, 2));

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
