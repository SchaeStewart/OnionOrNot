import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import { success, failure } from './lib/response-lib';
import getQuestion from './lib/getQuestion'
import { logError } from './lib/log-lib';

export const main: Handler = async (event: APIGatewayEvent, context: Context) => {
  try {
    const response = {
      statusCode: 200,
      body: JSON.stringify({ ...(await getQuestion()) })
    }
    return success(response)
  } catch (e) {
    const response = {
      body: JSON.stringify({ message: 'an error has occured', error: e })
    }
    logError('Error getting question from /question')(e)
    return failure(response)
  }
}