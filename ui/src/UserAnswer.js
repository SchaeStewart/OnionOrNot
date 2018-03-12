import React from 'react'
import { Button } from 'react-bootstrap'
import { PropTypes } from 'prop-types'

const UserAnswer = (props) => {
	const { handleClick } = props

	return (
		<Button bsStyle="primary" onClick={handleClick}>
			{props.children}
		</Button>
	)

}

UserAnswer.propTypes = {
	answerValue: PropTypes.bool,
	handleClick: PropTypes.func,
	children: PropTypes.node,
}

export default UserAnswer