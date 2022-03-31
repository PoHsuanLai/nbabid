import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, IconButton, Typography } from '@mui/material';
import { GET_USERS_QUERY } from '../graphql';
import { useLazyQuery } from '@apollo/client';

const username = 'username'
const password = 'password'

const initialData = {
    [username]: '',
    [password]: '',
}

function SignIn(props){

  const {open, handleClose, handleCancel,  stateRef} = props 

  const [formData, setFormData] = useState(initialData);
  const [displayError, setDisplayError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [load, { called,loading, data }] = useLazyQuery( 
    GET_USERS_QUERY, 
    {variables: {input: {username: formData.username, password: formData.password}}})
  const [userName, setUserName] = useState(null)
  const [cash, setCash] = useState(null)
  const [invalidUser, setInvalidUser] = useState(false)
  const [invalidPassword, setInvalidPasswoed] = useState(false)

  const handleChangeFormData = (key, value) => {
    setDisplayError(false)
    setFormData({
      ...formData,
      [key]: value
    })
  }

  useEffect(()=>{
    stateRef.current = {userName, cash}
    })

  const handleClosePage = () => {
      setFormData(initialData)
      handleCancel()
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
      if(called&&loading){console.log('loading')}
      setUserName(data.username)
      setCash(data.cash)
      handleClose()
    }catch(e){
      if(e==='cant find username!'){
        setInvalidUser(true)
      }
      else if(e==='wrong password!'){
        setInvalidPasswoed(true)
      }
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
            helperText={invalidUser?'User Name does not Exist!':''}
            fullWidth
            variant='standard'
            value={formData[username]}
            onChange={(e)=>handleChangeFormData(username, e.target.value)}
            />
            <TextField
            margin = 'dense'
            label = 'Password'
            error={invalidPassword}
            helperText={invalidPassword?'Wrong Password!':''}
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