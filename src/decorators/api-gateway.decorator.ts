import { ApiExtension } from '@nestjs/swagger';

export const ApiGatewayIntegration = (method: string, path: string) => {
  return ApiExtension('x-amazon-apigateway-integration', {
    type: 'HTTP_PROXY',
    httpMethod: method,
    uri: '${URI}' + path,
    payloadFormatVersion: 1.0,
  });
};
