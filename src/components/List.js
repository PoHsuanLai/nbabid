import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import EuroIcon from '@mui/icons-material/Euro'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { BID_CREATED_SUBSCRIPTION } from '../graphql';
// import { GET_USERS_QUERY } from '../graphql';
// import { useQuery } from '@apollo/client';


const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function MyList(props) {
    const {username, cash} = props
    // const {data, subscrbe} = useQuery(GET_USERS_QUERY)

    // React.useEffect(()=>{
    //   subscrbe({
    //     document: BID_CREATED_SUBSCRIPTION,
    //     updateQuery: (prev, { subscriptionData })=>{
    //       if(!subscriptionData.data) return prev;
    //       const {
    //         data: { bidCreated },
    //       }=subscriptionData;
    //       return {
    //         username: bidCreated.username,
    //         cash: bidCreated.cash
    //       }
    //     }
    //   })
    // },[subscrbe])

  return (
    <Box sx={{ display: 'flex', height: 200 }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256, height:200 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list" sx={{ height: 100}}>
              <ListItemIcon>
                  <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary={`${username}`}
                primaryTypographyProps={{
                  fontSize: 30,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 100 }}>
                <ListItemIcon>
                  <EuroIcon color='success' />
                </ListItemIcon>
                <ListItemText
                  primary={`${cash}`}
                  primaryTypographyProps={{
                    fontSize: 30,
                    color: 'success',
                    fontWeight: 'medium',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}