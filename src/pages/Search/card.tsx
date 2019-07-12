import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { IMiniData } from '@giligili'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      marginTop: '25px',
      height: '150px'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      minWidth: '150px',
      minHeight: '150px',
      width: '150px',
      height: '150px',
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
  item: IMiniData
}

export default function MediaControlCard({ item }: Props) {
  const classes = useStyles();
  const theme: any = useTheme();

  return (
    <Card className={classes.card}>
      <CardActionArea style={{ display: 'flex' }}>
        <CardMedia
          className={classes.cover}
          image={item.cover}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              {item.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {item.subname}
            </Typography>
            <Typography style={{ marginTop: '15px' }} variant="body2" color="textSecondary" component="p">
              {item.abstract}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
