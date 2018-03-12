import React from 'react'
import { PropTypes } from 'prop-types';

const ScoreCounter = (props) => {
	const {totalQuestions, totalCorrect} = props
	return(<h3>{totalCorrect} out of {totalQuestions} correct</h3>)
}

ScoreCounter.propTypes = {
	totalCorrect: PropTypes.number,
	totalQuestions: PropTypes.number
}

export default ScoreCounter