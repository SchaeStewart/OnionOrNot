import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'
import './index.css'
import App from './App'
import config from './config'
import registerServiceWorker from './registerServiceWorker'

Amplify.configure({
	API: {
		endpoints: [
			{
				name: 'question',
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION
			},
			{
				name: 'answer',
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION
			}
		]
	}
})

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
