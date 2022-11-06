import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props: any) {
  const {user} = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           <h1>{user.name}</h1>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Usuario surname: {user.surname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Usuario email: {user.email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}