import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader, Avatar, IconButton  } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors'
import userimg from '../../images/images.png';

export default function ActionAreaCard(props: any) {
  const {user} = props;
  return (
    <Card className="card">
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar className="cardHederotroicon" sx={{ bgcolor: red[500] }} aria-label="recipe">
              U
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title= {<h1 className="tituloCard"> user data</h1>}
          className="cardHederAvatar"
        />
        <CardContent className="cardContentIcon center">
          <Avatar
            
            alt="Remy Sharp"
            src={userimg}
            sx={{ width: 137, height: 137 }}
          />
        </CardContent>
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