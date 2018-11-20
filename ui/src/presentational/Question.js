import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
// {Object.keys(this.state.answer).length === 0 && (
//   <Grid
//     columns={{
//       count: 2,
//       size: 'auto',
//     }}
//     gap="large"
//   >
//     <Box>
//       <GuessSubreddit
//         btnText="r/theOnion"
//         handleClick={() => {
//           this._handleUserAnswer(true)
//         }}
//       />
//     </Box>
//     <Box>
//       <GuessSubreddit
//         btnText="r/NotTheOnion"
//         handleClick={() => {
//           this._handleUserAnswer(false)
//         }}
//       />
//     </Box>
//   </Grid>
// )}

const Question = props => {
  const { question } = props
  return (
    <Box>
      <h2>
        {question !== null ? (
          <div>{question.title}</div>
        ) : (
          <div>Loading question...</div>
        )}
      </h2>
    </Box>
  )
}

Question.propTypes = {
  question: PropTypes.object,
}

export default Question
