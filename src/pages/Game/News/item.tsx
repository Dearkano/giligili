import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip'
import { INews } from '@giligigli'
import TimeIcon from '@/assets/time.png'

function randomNum(minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return parseInt(`${Math.random() * minNum + 1}`, 10);
      break;
    case 2:
      return parseInt(`${Math.random() * (maxNum - minNum + 1) + minNum}`, 10);
      break;
    default:
      return 0;
      break;
  }
}

const useStyles = makeStyles(
  createStyles({
    card: {
      width: 1000,
      marginTop: 30,
      boxShadow: 'none'
    },
    chip: {
      height: 18,
      fontSize: '14px'
    },
    media: {
      width: '300px'
    },
    content: {
      maxHeight: '140px'
    }
  }),
);
interface Props {
  item: INews
}

const sources = ['电玩巴士', '游民星空', '游资网', '游迅网', '17173']
export default ({ item }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => window.location.href = item.url}>
        <div style={{ display: 'flex' }}>
          <CardMedia
            className={classes.media}
            component="img"
            alt="Contemplative Reptile"
            height="180px"
            width="300px"
            image={item.coverUrl}
          />
          <div style={{ display: 'flex', flexDirection: 'column', height: '180px', justifyContent: 'space-between', width: '700px' }}>

            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.abstract}
              </Typography>
            </CardContent>


            <CardActions style={{ display: 'flex', alignItems: 'center' }}>
              <Chip className={classes.chip} label={sources[randomNum(0, 4)]} color="primary" />
              <img src={TimeIcon} width="14px" />
              <Typography variant="body2" color="primary">
                {item.time}
              </Typography>
            </CardActions>
          </div>
        </div>
      </CardActionArea>
    </Card >
  );
}
