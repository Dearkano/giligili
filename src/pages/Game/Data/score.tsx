import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { IData } from '@giligili'
import Paper from '@material-ui/core/Paper'
import ScoreIcon from '@/assets/评分分析.png'
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
      marginBottom: '30px'
    },
    tabs: {
      boxShadow: 'none'
    },
    appbar: {
      boxShadow: 'none'
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
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
    <Paper className={classes.root}>
        <div style={{ paddingLeft: '30px', paddingTop: '20px',marginBottom: '20px' }} className={classes.row}>
        <img src={ScoreIcon} width="24px" style={{marginRight: '5px'}} />
          <Typography style={{ fontWeight: 'bolder' }} variant="h5" color="primary">评分分析</Typography>
        </div>
      <AppBar className={classes.appbar} position="static" color="#fff">
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {score.map((item, index) => (
            <Tab value={index} label={<div style={{ display: 'flex', flexDirection: 'column' }}>

              <div style={{ display: 'flex', alignItems: 'flex-end', fontWeight: 'bolder' }}><Typography variant="h6">{item.real_score}</Typography><sub style={{ fontSize: '10px' }}>/{item.full_score}</sub></div>
              <div>{item.website}</div>
            </div>}></Tab>
          ))}
        </Tabs>
      </AppBar>
      {score.map((item, index) => (value === index &&   <div><TabContainer>
          <Typography style={{ textIndent: '24px', opacity: 0.54 }} variant="body2">{item.comment}</Typography>
      </TabContainer></div>))}
    </Paper>
  );
}
