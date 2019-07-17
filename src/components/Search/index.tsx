import React from 'react'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import state from '@/models/state'
import useModel from '@/hooks/useModel'
import { searchByWord } from '@/services/search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      fontSize: '16px',
      border: 'rgb(223,225,227) solid 1px',
      width: '540px',
      height: '52px',
      borderRadius: '24px',
      alignItems: 'center',
      padding: '2px 4px'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '200px'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      flex: 1
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 3),
      transition: theme.transitions.create('width'),
      lineHeight: '34px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    iconButton: {
      padding: 10,
    },
  })
)

interface Props {
  height?: number
  width?: number
}

export default ({ height, width }: Props) => {
  const classes = useStyles();
  const s = useModel(state)
  const onKeyDown = (e: any) => {
    switch (e.keyCode) {
      case 13:
        submit()
        break
    }
  }
  // React.useEffect(() => {
  //   document.addEventListener("keydown", onKeyDown)
  // }, [])

  const handleChange = (e: any) => {
    //setWord(e.target.value)
    state.setWord(e.target.value)
  }

  const submit = async () => {
    if (s.word) {
      state.search()
      navigate(`/search/word/${s.word}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div className={classes.row} style={height && width ? { height, width } : {}}>
      <InputBase
        placeholder="探寻游戏之美…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'Search' }}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        value={s.word}
      />
      <IconButton onClick={submit} className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </div>)
}
