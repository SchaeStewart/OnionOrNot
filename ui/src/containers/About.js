import React from 'react'
import { Box, Text, Heading } from 'grommet'

const About = () => (
  <Box align="center">
    <header>
      <Heading level={1} size="medium" color="brand">
        About
      </Heading>
    </header>
    <Text align>
      This project was built by Schaffer Stewart for learning and fun. <br />
      It is open source and built with AWS Lambda, Serverless and React <br />
      <a href="https://github.com/SchaeStewart/OnionOrNot">
        See the project on GitHub
      </a>
    </Text>
  </Box>
)

export default About
