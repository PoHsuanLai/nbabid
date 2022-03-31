import CssBaseline from "@mui/material/CssBaseline";
import { useState, useRef } from "react";
import Bar from './components/bar'
import SignInModal from "./containers/SignIn";
import { useLazyQuery, useQuery } from '@apollo/client';
import {GET_GAMES_QUERY, GET_USERS_QUERY} from './graphql'
import SignUpModal from './containers/SignUp'
import Background from "./components/background";

function App() {
  const [signIn, setSignIn] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [show, setShow] = useState(false)
  const stateRef = useRef({username: null})
  const result = useQuery( GET_GAMES_QUERY )
  const [user, setUser] = useState(null)

  const handleLogIn = () => {
    setOpenSignIn(true);
  }

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
    setSignIn(true)
    setUser(stateRef.username)
  }

  const openShow =  () => {
    if(stateRef.signIn){ 
      show?setShow(false):setShow(true)
    }
    else alert('Please Sign In First!')

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


  return (
    <div>
          <CssBaseline />
          <div style={{ backgroundColor: "#f5f5f5", height: "500vh" }}>
          <Bar handleLogIn={handleLogIn} handleSignUp={handleOpenSignUp} handleLogOut={handleLogOut} signIn={signIn} handleShow={openShow}/>
          <SignUpModal open={openSignUp} handleCloseSignUp={handleCloseSignUp} handleCancel={handleCancelSignUp} stateRef={stateRef}/>
          <SignInModal open={openSignIn} handleClose={handleCloseSignIn} handleCancel={handleCancelSignIn} stateRef={stateRef}/>
          <Background games={result.data} signIn={signIn} user={signIn?user:null}/>
          </div>
    </div>
  );
}

export default App