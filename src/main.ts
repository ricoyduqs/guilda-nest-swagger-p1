import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { version } from '../package.json'; // Para utilizar a versão do package.json adicione ao tsconfig.json a propriedade "resolveJsonModule": true
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 400,
    }),
  );

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
    .addServer('http://0.0.0.0:3000', 'Local')
    .addServer('http:/www.yduqs.com.br', 'Production') // Aqui você pode inserir quantos servidores quiser.
    .addTag('user', 'Collection of user endpoints') // As tags servem para mapear os endpoints rais linkando ao controller.
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  writeFileSync('./swagger.json', JSON.stringify(documentFactory(), null, 2)); // Aqui você pode salvar o arquivo JSON gerado pelo Swagger.

  SwaggerModule.setup('api', app, documentFactory);

  // Usando essa instrução, o o documento em OpenAPI do swagger será acessado através do endpoint /swagger/json
  // SwaggerModule.setup('api', app, documentFactory, {
  //   jsonDocumentUrl: 'swagger/json',
  // });

  await app.listen(3000);
}
bootstrap();
