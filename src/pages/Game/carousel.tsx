import React from 'react';
import { makeStyles, useTheme, createStyles, Theme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 800,
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50
    },
    img: {
      height: 450,
      display: 'block',
      maxWidth: 800,
      overflow: 'hidden',
      width: '100%',
    },
  }));
interface Props {
  imgUrl: string[]
}
export default ({ imgUrl }: Props) => {
  const classes = useStyles()
  const theme: any = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);


  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleStepChange(step: any) {
    setActiveStep(step);
  }

  const urls = []
  for(const i of imgUrl){
    if(i.indexOf('thumbnail')===-1){
      urls.push(i)
    }
  }
  const maxSteps = urls.length;
  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {urls.map((item, index) => (
          <div key={item}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={item} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
}
