import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import * as question from './lib/question-lib'

export const main: Handler = async (event: APIGatewayEvent, context: Context) => {
  const data = JSON.parse(event.body);

  const theQuestion = await question.getById(data.id)
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      ...theQuestion,
      answerCorrect: (theQuestion.theOnion === data.theOnion)
    })
  }
  return response
}