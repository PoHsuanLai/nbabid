import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

const drawerWidth = 240

export default function Bar({handleLogIn,handleSignUp , handleLogOut, signIn, handleOpenDrawer}) {

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#02579a",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            NBA
          </Typography>
            {   !signIn?
              <>
                <Button color='inherit' onClick={handleSignUp}>Sign Up</Button>
                <Button color="inherit" onClick={handleLogIn}>Login</Button>
              </>:
                <Button color='inherit' onClick={handleLogOut}>Logout</Button>
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}
