import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, IconButton } from '@mui/material';
import { GET_USERS_QUERY } from '../graphql';
import { useLazyQuery } from '@apollo/client';

const username = 'username'
const password = 'password'

const initialData = {
    [username]: '',
    [password]: '',
}

function SignIn(props){

  const {open, handleClose, stateRef} = props 

  const [formData, setFormData] = useState(initialData);
  const [displayError, setDisplayError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [load, { called,loading, data }] = useLazyQuery( 
    GET_USERS_QUERY, 
    {variables: {input: {username: formData.username, password: formData.password}}})
  const [userName, setUserName] = useState(null)
  const [signIn, setSignIn] = useState(false)

  const handleChangeFormData = (key, value) => {
    setDisplayError(false)
    setFormData({
      ...formData,
      [key]: value
    })
  }

  useEffect(()=>{
    stateRef.current = {userName, signIn}
    })

  const handleClosePage = () => {
      setFormData(initialData)
      handleClose()
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkUser = async () => {
    try{
      await load()
      setUserName(data.username)
      setSignIn(true)
      handleClose()
    }catch(e){
      alert(e)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
            <TextField
            error={displayError && !formData[username]}
            autoFocus
            margin = 'dense'
            label = 'Username'
            fullWidth
            variant='standard'
            value={formData[username]}
            onChange={(e)=>handleChangeFormData(username, e.target.value)}
            />
            <TextField
            margin = 'dense'
            label = 'Password'
            fullWidth
            variant='standard'
            type={showPassword?'text':'password'}
            onChange={(e)=>handleChangeFormData(password, e.target.value)}
            InputProps={{endAdornment: 
                <InputAdornment position='end' >
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                    </IconButton>
                </InputAdornment>}}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClosePage}>Cancel</Button>
            <Button onClick={checkUser}>Log In</Button>
        </DialogActions>
    </Dialog>
  );
}

export default SignIn