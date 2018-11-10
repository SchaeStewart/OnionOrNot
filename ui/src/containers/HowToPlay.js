import React from 'react'
import { Box, Text, Heading } from 'grommet'

const HowToPlay = () => (
  <Box align="center" width="large">
    <header>
      <Heading level={1} size="medium" color="brand">
        How To Play
      </Heading>
    </header>
    <Text>
      The title of a Reddit post will be displayed.
      <br />
      The post will either be from reddit.com/r/TheOnion - a sub Reddit
      dedicated to content from TheOnion.com <br />
      Or the post will be from reddit.com/r/NotTheOnion - a sub Reddit dedicated
      to real news articles that sound so crazy they could be from The Onion
      <br />
      The game is to guess which sub Reddit each post comes from.
    </Text>
  </Box>
)

export default HowToPlay
