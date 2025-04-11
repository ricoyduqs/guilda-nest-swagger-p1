import * as fs from 'fs';
import * as path from 'path';

interface SwaggerOperation {
  path: string;
  method: string;
  summary: string;
  description: string;
  parameters: {
    in: string;
    name: string;
    required: boolean;
    schema: any;
  }[];
  requestBody?: {
    content: {
      'application/json': {
        schema: any;
      };
    };
  };
  responses: Record<string, any>;
}

try {
  const swaggerPath = path.resolve('./swagger.json');
  const outputPath = path.resolve('./project-document.md');

  const swagger = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
  const lines: string[] = [];

  lines.push(`# 📘 ${swagger.info?.title || 'API'} Documentation`);
  lines.push(`**Versão:** ${swagger.info?.version || '1.0.0'}`);
  lines.push(`\n---\n`);

  const tagsMap = new Map<string, SwaggerOperation[]>();

  for (const [pathKey, pathItem] of Object.entries<any>(swagger.paths || {})) {
    for (const [method, operation] of Object.entries<any>(pathItem)) {
      const tag = operation.tags?.[0] || 'Geral';

      if (!tagsMap.has(tag)) {
        tagsMap.set(tag, []);
      }

      tagsMap.get(tag)?.push({
        path: pathKey,
        method,
        summary: operation.summary || '',
        description: operation.description || '',
        parameters: operation.parameters || [],
        requestBody: operation.requestBody,
        responses: operation.responses || {},
      });
    }
  }

  function getRequestBodyExample(requestBody: any) {
    const schema = requestBody?.content?.['application/json']?.schema;
    return schema?.example || getSingleItemExample();
  }

  function getSingleItemExample() {
    return {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
    };
  }

  function getListExample() {
    return [getSingleItemExample()];
  }

  function generateErrorExample(status: string, message: string) {
    return `// Response ${status}
\`\`\`json
{
  "status": "error",
  "timestamp": "${new Date().toISOString()}",
  "error": "${message}"
}
\`\`\``;
  }

  function generateSuccessExample(method: string) {
    const statusMap = {
      post: '201 Created',
      delete: '204 No Content',
      default: '200 OK',
    };

    const status = statusMap[method] || statusMap.default;

    return `// Response ${status}
\`\`\`json
${JSON.stringify(getSingleItemExample(), null, 2)}
\`\`\``;
  }

  function generateGetExample(path: string, hasParams: boolean): string {
    const successResponse = hasParams
      ? getSingleItemExample()
      : getListExample();

    const example = `// Request
GET ${path}

\`\`\`json
${JSON.stringify(successResponse, null, 2)}
\`\`\``;

    const error = hasParams
      ? `\n${generateErrorExample('404 Not Found', 'Resource not found')}`
      : '';

    return `${example}${error}`;
  }

  function generatePostExample(path: string, requestBody: any): string {
    return `// Request
POST ${path}
Content-Type: application/json

\`\`\`json
${JSON.stringify(getRequestBodyExample(requestBody), null, 2)}
\`\`\`

${generateSuccessExample('post')}

${generateErrorExample('400 Bad Request', 'Invalid data provided')}`;
  }

  function generatePutExample(path: string, requestBody: any): string {
    return `// Request
PUT ${path}
Content-Type: application/json

\`\`\`json
${JSON.stringify(getRequestBodyExample(requestBody), null, 2)}
\`\`\`

${generateSuccessExample('put')}

${generateErrorExample('400 Bad Request', 'Invalid data provided')}`;
  }

  function generateDeleteExample(path: string): string {
    return `// Request
DELETE ${path}

${generateSuccessExample('delete')}

${generateErrorExample('404 Not Found', 'Resource not found')}`;
  }

  for (const [tag, operations] of tagsMap) {
    lines.push(`\n## 📂 ${tag}\n`);

    for (const operation of operations) {
      lines.push(`### ${operation.method.toUpperCase()} \`${operation.path}\``);
      if (operation.summary) lines.push(`**Resumo:** ${operation.summary}`);
      if (operation.description) lines.push(`\n${operation.description}\n`);

      switch (operation.method.toLowerCase()) {
        case 'get':
          lines.push(
            generateGetExample(operation.path, !!operation.parameters?.length),
          );
          break;
        case 'post':
          lines.push(
            generatePostExample(operation.path, operation.requestBody),
          );
          break;
        case 'put':
          lines.push(generatePutExample(operation.path, operation.requestBody));
          break;
        case 'delete':
          lines.push(generateDeleteExample(operation.path));
          break;
      }

      lines.push('\n---\n');
    }
  }

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log('Documentation successfully generated in:', outputPath);
} catch (error) {
  console.error('Error generating documentation:', error);
  process.exit(1);
}
