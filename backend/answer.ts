import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import { success, failure } from './lib/response-lib'
import * as question from './lib/question-lib'
import { logError } from './lib/log-lib';

export const main: Handler = async (event: APIGatewayEvent, context: Context) => {
  const data = JSON.parse(event.body)
  const id = data.id
  try {
    const theQuestion = await question.getById(id)
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        ...theQuestion,
        correct: (theQuestion.theOnion === data.theOnion)
      })
    }
    return success(response)
  } catch (e) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        id,
      ...e
      })
    }
    logError('Error posting to /answer')(e)
    return failure(response)
  }
}