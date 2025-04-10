import * as fs from 'fs';
import * as yaml from 'js-yaml';

try {
  const swaggerJson = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));
  const yamlDump = yaml.dump(swaggerJson);
  const openApiYaml = yaml.load(yamlDump) as Record<string, any>;

  if (openApiYaml.servers) {
    delete openApiYaml.servers;
    console.log('Section server removed');
  }

  const swaggerYaml = yaml.dump(openApiYaml, { lineWidth: -1 });

  fs.writeFileSync('./openapi-gateway.yaml', swaggerYaml);
  console.log('AWS API Gateway YAML file created');
} catch (err) {
  console.error('Error to processed YAML:', err);
}
