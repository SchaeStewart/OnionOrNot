import React, { Component } from 'react'
import { Grommet, Grid, Text, Box, Button } from 'grommet'
import { Menu } from 'grommet-icons'
import { base } from 'grommet/themes'
import Routes from './Routes'
import './App.css'

/* TODO: Styling */
/**
 * Frontend logic clean up
 * Add how to play modal on first launch
 * Fix the www domain
 * Show question history
 */

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebar: false,
    }
  }

  render() {
    const { sidebar } = this.state
    return (
      <Grommet theme={base}>
        <Grid
          rows={['auto', 'medium']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'sidebar', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: 'medium', vertical: 'small' }}
            background="dark-2"
          >
            <Button onClick={() => this.setState({ sidebar: !sidebar })}>
              <Menu />
            </Button>
            <Text size="large">Onion or Not </Text>
          </Box>
          {sidebar && (
            <Box
              gridArea="sidebar"
              background="dark-5"
              width="small"
              animation={[
                { type: 'fadeIn', duration: 300 },
                { type: 'slideRight', size: 'xlarge', duration: 150 },
              ]}
            >
              <Button key="home" href="/" hoverIndicator>
                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                  <Text>Home</Text>
                </Box>
              </Button>
              <Button key="about" href="/about" hoverIndicator>
                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                  <Text>About</Text>
                </Box>
              </Button>
              <Button key="howToPlay" href="/how-to-play" hoverIndicator>
                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                  <Text>How To Play</Text>
                </Box>
              </Button>
            </Box>
          )}
          <Box gridArea="main" justify="center" align="center">
            <Routes />
          </Box>
        </Grid>
      </Grommet>
    )
  }
}

export default App
