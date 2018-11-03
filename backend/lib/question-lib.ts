import * as dynamoDbLib from "./dynamodb-lib";
import Post from './Post'
// const db = require('../db');
// const { logError } = require('../lib/helpers');


  export const getById = (id: string): Post => {
    const params = {
      TableName: 'onion-or-not',
      Key: {
        id
      }
    }
    return dynamoDbLib.call('get', params)
      .then(res => ({...res.Item}))
  }
  

  export const save = (post: Post) => {
    const params = {
      TableName: "onion-or-not",
      Item: post 
    };
    dynamoDbLib.call('put', params)
    return { title: post.title, id: post.id }
  }
    // .catch(logError),

  // export const getRandom = () => db.query(`SELECT * FROM questions
  //   OFFSET RANDOM() * 
  //   (SELECT COUNT(*) FROM questions) LIMIT 1;`)
  //   .then(res => res.rows[0])
    // .catch(logError),
