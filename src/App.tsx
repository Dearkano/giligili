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
  <div style={{paddingBottom: '30px'}}>
    <TopBar />
    <Router />
  </div>
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
