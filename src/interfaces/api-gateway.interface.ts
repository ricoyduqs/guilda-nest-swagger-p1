export interface ApiGatewayIntegration {
  type: string;
  httpMethod: string;
  uri: string;
  payloadFormatVersion: number;
}
