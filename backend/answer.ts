import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import { success, failure } from './lib/response-lib'
import * as question from './lib/question-lib'
import { isDate } from 'util';

export const main: Handler = async (event: APIGatewayEvent, context: Context) => {
  const data = JSON.parse(event.body);
  console.log('ID: ', data.id)
  try {
    const theQuestion = await question.getById(data.id)
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        ...theQuestion,
        answerCorrect: (theQuestion.theOnion === data.theOnion)
      })
    }
    return success(response)
  } catch (e) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        id: data.id,
      ...e
      })
    }
    return failure(response)
  }
}