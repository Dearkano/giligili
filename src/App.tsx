import React from 'react'

import useModel from '@/hooks/useModel'
import settingModel from '@/models/setting'

import { ThemeProvider } from '@material-ui/styles'

import { getTheme } from '@/theme'

import Router from '@/router'
import TopBar from '@/components/TopBar'
import BotImg from '@/assets/bot.png'
import Paper from '@material-ui/core/Paper'
const App = () => (
  <>
    <TopBar />
    <Router />
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '30px', marginTop: '50px', position: 'absolute' }}><img width="400px" height="65px" src={BotImg} /></div>
  </>
)

const Root = () => {
  const { theme, mode } = useModel(settingModel, ['theme', 'mode'])

  return (
    <ThemeProvider theme={getTheme(theme, mode)}>
      <App />
    </ThemeProvider>
  )
}

export default Root
