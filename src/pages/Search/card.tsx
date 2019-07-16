import React from 'react';
import { Link } from '@reach/router'
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { IMiniData } from '@giligili'
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      height: '150px',
      width: '100%'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      height: '150px',
      overflow: 'hidden',
      paddingTop: '2px',
      flexGrow: 1
    },
    content: {
      flex: '1 0 auto',
      paddingTop: '0px'
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
    row: {
      display: 'flex'
    }
  }),
);

interface Props {
  item: IMiniData
}

export default function MediaControlCard({ item }: Props) {
  const classes = useStyles();
  const theme: any = useTheme();

  return (
    <Link style={{ textDecoration: 'none', marginTop: '45px', width: '100%' }} to={`/game/${item._id}`}>
      <Card className={classes.card}>
        <CardActionArea style={{ display: 'flex' }}>
          <CardMedia
            className={classes.cover}
            image={item.coverUrl}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <div className={classes.row}>
                <Typography component="h5" variant="h5">
                  {item.name}
                </Typography>

                {item.theme.length !== 0 && <Chip style={{marginLeft: '10px'}} color="primary" label={item.theme[0]} />}
                {item.type.length !== 0 && <Chip style={{marginLeft: '10px'}} color="primary" label={item.type[0]} />}
                {item.view.length !== 0 && <Chip style={{marginLeft: '10px'}} color="primary" label={item.view[0]} />}
              </div>
              <Typography variant="subtitle2" color="textSecondary">
                {item.subname}
              </Typography>
              <Typography style={{ marginTop: '15px' }} variant="body2" color="textSecondary" component="p">
                {item.introduction}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </Link>
  );
}
