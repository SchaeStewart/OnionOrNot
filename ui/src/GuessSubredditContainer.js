import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Box } from 'grommet'
import GuessSubreddit from './presentational/GuessSubreddit'

const GuessSubredditContainer = ({ handleGuess }) => (
  <Grid
    columns={{
      count: 2,
      size: 'auto',
    }}
    gap="large"
  >
    <Box>
      <GuessSubreddit
        btnText="r/theOnion"
        handleClick={() => {
          handleGuess(true)
        }}
      />
    </Box>
    <Box>
      <GuessSubreddit
        btnText="r/NotTheOnion"
        handleClick={() => {
          handleGuess(false)
        }}
      />
    </Box>
  </Grid>
)

GuessSubredditContainer.propTypes = {
  handleGuess: PropTypes.func.isRequired,
}

export default GuessSubredditContainer
