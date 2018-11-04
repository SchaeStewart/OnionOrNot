import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import { success, failure } from './lib/response-lib';
import getQuestion from './lib/getQuestion'

export const main: Handler = async (event: APIGatewayEvent, context: Context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ ...(await getQuestion()) })
  }
  return success(response)
}