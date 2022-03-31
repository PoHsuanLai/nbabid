import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USERS_MUTATION } from '../graphql';
import { GET_USERS_QUERY } from '../graphql';
import bcrypt from 'bcryptjs'
import {v4 as uuidv4} from 'uuid'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, IconButton } from '@mui/material';
import { useLazyQuery } from '@apollo/client';

const saltRounds = 10

const username = 'username'
const password = 'password'

const initialData = {
    [username]: '',
    [password]: '',
}

function SignUp( {open, handleCloseSignUp, handleCancel, stateRef} ){

  const [formData, setFormData] = useState(initialData);
  const [displayError, setDisplayError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null)
  const [cash, setCash] = useState(null)
  const [load, { called,loading, data }] = useLazyQuery( 
    GET_USERS_QUERY, 
    {variables: {input: {username: formData.username, password: formData.password}}})

  const handleChangeFormData = (key, value) => {
    setDisplayError(false)
    setFormData({
      ...formData,
      [key]: value
    })
  }

  useEffect(()=>{
    stateRef.current = {user, cash}
  })

  const [createUser] = useMutation(CREATE_USERS_MUTATION)

  const hashPassword = async (password)=>{
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  }

  const handleClose = () => {
      setFormData(initialData)
      handleCancel()
  }

  const handleSuccess = () => {
      setFormData(initialData)
      setUser(formData.username)
      setCash(100000)
  }

  const handleCreate=async()=>{
    console.log('1')
    if(Object.values(formData).some((v)=>!v)){
        setDisplayError(true)
        return
    }
    console.log('2')
    try{
      await load
        console.log(data)
        alert(`username ${data.username} already exists!`)
        setFormData(initialData)
        console.log(data)
        return
    }catch(e){
      console.log(e)
      if(e==='cant find username!'){
        console.log('new user')
        const newpassword = await hashPassword(formData.password, saltRounds)
        createUser({
        variables: {
            input: {
            id: uuidv4(),
            username: formData.username,
            password: newpassword,
            cash: 100000,
            },
        },
        onCompleted: () => {
          handleSuccess()
          },
        })
      }
      else if(e==='wrong password!'){
        alert(`username ${formData.username} already exists!`)
        setFormData(initialData)
        return
      }
    }

    
}
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Sign Up</DialogTitle>
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
            // helperText={displayError && "The field can't be empty!"}
            />
            <TextField
            margin = 'dense'
            label = 'Password'
            fullWidth
            variant='standard'
            type={showPassword?'text':'password'}
            onChange={(e)=>handleChangeFormData(password, e.target.value)}
            // helperText={displayError && "The field can't be empty!"}
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Sign Up</Button>
        </DialogActions>
    </Dialog>
  );
}

export default SignUp