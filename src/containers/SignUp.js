import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USERS_MUTATION } from '../graphql';
import { GET_USERS_QUERY } from '../graphql';
import bcrypt from 'bcryptjs'
import {v4 as uuidv4} from 'uuid'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, IconButton } from '@mui/material';

const saltRounds = 10

const username = 'username'
const password = 'password'

const initialData = {
    [username]: '',
    [password]: '',
}

function SignUp( {open, handleCloseSignUp} ){

  const [formData, setFormData] = useState(initialData);
  const [displayError, setDisplayError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeFormData = (key, value) => {
    setDisplayError(false)
    setFormData({
      ...formData,
      [key]: value
    })
  }

  const [createUser] = useMutation(CREATE_USERS_MUTATION)

  const hashPassword = async (password)=>{
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  }

  const handleClose = () => {
      setFormData(initialData)
      handleCloseSignUp()
  }

  const handleCreate=async()=>{
    if(Object.values(formData).some((v)=>!v)){
        setDisplayError(true)
        return
    }
    const newpassword = await hashPassword(formData.password, saltRounds)
    createUser({
        variables: {
            input: {
            id: uuidv4(),
            username: formData.username,
            password: newpassword,
            cash: 10000,
            bid: '',
            },
        },
    refetchQueries: [GET_USERS_QUERY],
    onCompleted: () => {
        handleClose()
    },
  })
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