import CssBaseline from "@mui/material/CssBaseline";
import { useState, useRef } from "react";
import Bar from './components/bar'
import SignInModal from "./containers/SignIn";
import { useLazyQuery, useQuery } from '@apollo/client';
import {GET_GAMES_QUERY, GET_USERS_QUERY} from './graphql'
import SignUpModal from './containers/SignUp'
import Background from "./components/background";
import MyList from "./components/List";

function App() {
  const [signIn, setSignIn] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [show, setShow] = useState(false)
  const stateRef = useRef({username: null, signIn: false})
  const [load, { loading, data }] = useLazyQuery( GET_USERS_QUERY, {variables: {input: {username: stateRef.current.username, password: stateRef.current.password}}})
  const result = useQuery( GET_GAMES_QUERY )

  const handleLogIn = () => {
    setOpenSignIn(true);
  }

  const handleClose = () => {
    setOpenSignIn(false);
    console.log(signIn)
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
  }

  const handleLogOut = () => {
    setSignIn(false)
  }


  return (
    <div>
          <CssBaseline />
          <div style={{ backgroundColor: "#f5f5f5", height: "500vh" }}>
          <Bar handleLogIn={handleLogIn} handleSignUp={handleOpenSignUp} handleLogOut={handleLogOut} signIn={signIn} handleShow={openShow}/>
          {(signIn||stateRef.signIn)&&show?<MyList username={data.users.username} cash={data.users.cash}></MyList>:<></>}
          <SignUpModal open={openSignUp} handleCloseSignUp={handleCloseSignUp} />
          <SignInModal open={openSignIn} handleClose={handleClose} stateRef={stateRef}/>
          <Background games={result.data} signIn={signIn} user={signIn?data.users.username:null}/>
          
          </div>
    </div>
  );
}

export default App