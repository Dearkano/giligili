import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { IData } from '@giligili'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      marginTop: '25px',
      height: '280px',
      boxShadow: 'none'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      height: '280px'
    },
    content: {
      flex: '1 0 auto',
      justifyContent: 'flex-end',
      display: 'flex',
      flexDirection: 'column'
    },
    cover: {
      minWidth: '200px',
      minHeight: '280px',
      width: '200px',
      height: '280px',
      overflow: 'hidden'
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);

interface Props {
  item: IData
}

export default function MediaControlCard({ item }: Props) {
  const classes = useStyles();
  const theme: any = useTheme();
  const { tgbusData } = item

  return (
    <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={tgbusData.coverUrl}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography style={{fontWeight: 'bolder'}} component="h4" variant="h4" color="primary">
              {tgbusData.name}
            </Typography>
            <Typography variant="h6" color="primary">
              {tgbusData.subname}
            </Typography>
            <Typography style={{ marginTop: '15px' }} variant="body2" color="textSecondary" component="p">
              {tgbusData.introduction}
            </Typography>
          </CardContent>
        </div>
    </Card>
  );
}
