import * as dynamoDbLib from "./dynamodb-lib";
import Post from './Post'
import { logError } from './log-lib';

export const getById = (id: string): Post =>
  dynamoDbLib.call('get', {
    TableName: 'onion-or-not',
    Key: {
      id: id,
    }
  })
    .then(res => ({ ...res.Item }))
    .catch(logError('Error getting post by id'))

export const save = (post: Post) =>
  dynamoDbLib.call('put', {
    TableName: "onion-or-not",
    Item: post
  })
    .then(() => ({ title: post.title, id: post.id }))
    .catch(logError('Error saving post'))

/*
  export const getRandom = () => db.query(`SELECT * FROM questions
     OFFSET RANDOM() * 
     (SELECT COUNT(*) FROM questions) LIMIT 1;`)
  .then(res => res.rows[0])
  .catch(logError),
*/
