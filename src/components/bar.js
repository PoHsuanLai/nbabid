import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu'

export default function Bar({handleLogIn,handleSignUp , handleLogOut, signIn, handleShow}) {

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
            onClick={handleShow}
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
