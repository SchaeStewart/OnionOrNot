import React from 'react'
import { Button } from 'grommet'
import { PropTypes } from 'prop-types'

const GuessSubreddit = ({ handleClick, btnText }) => (
  <Button primary onClick={handleClick}>
    {btnText}
  </Button>
)

GuessSubreddit.propTypes = {
  handleClick: PropTypes.func,
  btnText: PropTypes.string.isRequired,
}

export default GuessSubreddit
