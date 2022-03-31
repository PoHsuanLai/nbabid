import CssBaseline from "@mui/material/CssBaseline";
import { useState, useRef } from "react";
import Bar from './components/bar'
import SignInModal from "./containers/SignIn";
import { useQuery } from '@apollo/client';
import { GET_GAMES_QUERY } from './graphql'
import SignUpModal from './containers/SignUp'
import Background from "./components/background";
import PersistentDrawerLeft from "./components/Drawers";

function App() {
  const [signIn, setSignIn] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const stateRef = useRef({username: null, cash: null})
  const result = useQuery( GET_GAMES_QUERY )
  const [user, setUser] = useState(null)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [cash, setCash] = useState(null)
  const [openHistory, setOpenHistory] = useState(false)
  

  const handleLogIn = () => {
    setOpenSignIn(true);
  }

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
    setSignIn(true)
    setUser(stateRef.username)
  }

  const handleDrawerOpen =  () => {
    setCash(stateRef.cash)
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const handleOpenSignUp = () => {
    setOpenSignUp(true)
  }

  const handleCloseSignUp = () => {
    setOpenSignUp(false)
    setSignIn(true)
    setUser(stateRef.username)
  }

  const handleLogOut = () => {
    setSignIn(false)
    setUser(null)
  }

  const handleCancelSignIn = () => {
    setOpenSignIn(false)
  }

  const handleCancelSignUp = () => {
    setOpenSignUp(false)
  }

  const handleOpenHistory = () => {
    setOpenHistory(true)
  }

  const handleHome = () => {
    setOpenHistory(false)
  }

  return (
    <div>
          <CssBaseline />
          <Bar handleLogIn={handleLogIn} handleSignUp={handleOpenSignUp} handleLogOut={handleLogOut} signIn={signIn} handleDrawerOpen={handleDrawerOpen} />
          <PersistentDrawerLeft open={openDrawer}  handleDrawerClose={handleDrawerClose} username={user} cash={cash} handleOpenHistory={handleOpenHistory} handleHome={handleHome}/>
          <SignUpModal open={openSignUp} handleCloseSignUp={handleCloseSignUp} handleCancel={handleCancelSignUp} stateRef={stateRef}/>
          <SignInModal open={openSignIn} handleClose={handleCloseSignIn} handleCancel={handleCancelSignIn} stateRef={stateRef}/>
          <Background games={result.data} signIn={signIn} user={user} openHistory={openHistory} />
    </div>
  );
}

export default App