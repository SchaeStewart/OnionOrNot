import React from 'react'
import PropTypes from 'prop-types'

const Question = (props) => {
	const {question} = props 
	return (
		<h2>{ question !== null ?
			<div>{question.title}</div>
			: <div>Loading question...</div>
		}
		</h2>
	)
}

Question.propTypes = {
	question: PropTypes.object
}

export default Question