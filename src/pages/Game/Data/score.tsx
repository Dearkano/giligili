import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { IData } from '@giligili'

interface TabContainerProps {
  children?: React.ReactNode;
}

function TabContainer(props: TabContainerProps) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      marginTop: ' 30px',
      backgroundColor: '#fff',
      marginBottom: '30px',
      boxShadow: 'none'
    },
    tabs: {
      boxShadow: 'none'
    },
    appbar: {
      boxShadow: 'none'
    }
  }),
);

interface Props {
  data: IData
}

export default ({ data }: Props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { score } = data

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static" color="default">
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {score.map(item => (
            <Tab label={<div style={{ display: 'flex', flexDirection: 'column' }}>

              <div style={{display:'flex',alignItems:'flex-end',fontWeight: 'bolder'}}><Typography variant="h6">{item.real_score}</Typography><sub style={{fontSize: '10px'}}>/{item.full_score}</sub></div>
              <div>{item.website}</div>
            </div>}></Tab>
          ))}
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer>Item One</TabContainer>}
      {value === 1 && <TabContainer>Item Two</TabContainer>}
      {value === 2 && <TabContainer>Item Three</TabContainer>}
      {value === 3 && <TabContainer>Item Four</TabContainer>}
      {value === 4 && <TabContainer>Item Five</TabContainer>}
      {value === 5 && <TabContainer>Item Six</TabContainer>}
      {value === 6 && <TabContainer>Item Seven</TabContainer>}
    </div>
  );
}
