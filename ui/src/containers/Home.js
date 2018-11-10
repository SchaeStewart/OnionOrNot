import React from 'react'
import { Box, Heading } from 'grommet'
import OnionOrNot from '../OnionOrNot'

const Home = () => (
  <Box align="center">
    <header>
      <Heading level={1} size="medium" color="brand">
        Welcome to Onion or Not!
      </Heading>
    </header>
    <OnionOrNot />
  </Box>
)

export default Home
