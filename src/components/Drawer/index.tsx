import React, {useState} from 'react';
import {navigate} from '@reach/router'
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import User from '@/components/TopBar/User'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import IssueIcon from '@material-ui/icons/Send';
import InfoIcon from '@material-ui/icons/Info'
import BookIcon from '@material-ui/icons/bookmarks'
import ExitIcon from '@material-ui/icons/ExitToApp'
import useModel from '@/hooks/useModel'
import stateModel from '@/models/state'


const drawerWidth = 240;

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      display: 'flex',
      height: '4rem'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    menu: {
      root:{
        width: '4rem'
      }
    }
  }),
);

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme:any = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const isProfileMenuOpen = Boolean(profileAnchorEl);

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null)
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ profileAnchorEl: event.currentTarget });
  };
  const renderProfileMenu = (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
    </Menu>
  );

  const  {isLogIn, myInfo} = useModel(stateModel, ['isLogIn','myInfo'])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
          <Toolbar>
            <IconButton onClick={handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Gemini | 专注旧书交易
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
             <User />
            </div>
          </Toolbar>
        </AppBar>}
        {renderProfileMenu}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem onClick={()=>navigate('/')} button key={'主页'}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={'主页'} />
            </ListItem>

            <ListItem onClick={()=>navigate('/issue')} button key={'发布'}>
              <ListItemIcon><IssueIcon /></ListItemIcon>
              <ListItemText primary={'发布'} />
            </ListItem>

            <ListItem onClick={()=>navigate('/buy')} button key={'求购'}>
              <ListItemIcon><BookIcon /></ListItemIcon>
              <ListItemText primary={'求购'} />
            </ListItem>

            <ListItem onClick={()=>navigate('/message')} button key={'私信'}>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary={'私信'} />
            </ListItem>

            <ListItem onClick={()=>navigate('/user')} button key={'个人信息'}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary={'个人信息'} />
            </ListItem>

        </List>
        <Divider />
        <List>
          {isLogIn &&
              <ListItem onClick={()=>stateModel.LOG_OUT()} button key={'注销'} >
              <ListItemIcon><ExitIcon /></ListItemIcon>
              <ListItemText primary={'注销'} />
            </ListItem>}
        </List>
      </Drawer>
    </div>
  );
}
