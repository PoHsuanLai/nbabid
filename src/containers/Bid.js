import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_BID_MUTATION } from '../graphql';
import {v4 as uuidv4} from 'uuid'

const price = 'price'

const initialData = {
    [price]: '',
}

export default function Bid(props){

  const {open, handleClose, username, team, gameid} = props 

  const [formData, setFormData] = useState(initialData);
  const [displayError, setDisplayError] = useState(false);

  const handleChangeFormData = (key, value) => {
    setDisplayError(false)
    setFormData({
      ...formData,
      [key]: value
    })
  }

  const [createBid] = useMutation( CREATE_BID_MUTATION )

  const handleCreate = async () => {
    if(Object.values(formData).some((v)=>!v)){
        setDisplayError(true)
        return
    }

    // console.log(formData['price'])
    // console.log(newprice)
    createBid({
        variables: {
            // name: username,
            // bid: date+'-'+team+'-'+parseInt(formData['price']),
            // price: parseInt(formData['price'])
            id: uuidv4(),
            gameID: gameid,
            user: username,
            bidFor: team,
            bidMoney: formData.price,
            result: null,
            },onCompleted: ()=>{handleClose()}
        }
    )
  }

  const handleClosePage = () => {
      setFormData(initialData)
      handleClose()
  }


  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Bid</DialogTitle>
        <DialogContent>
            <TextField
            error={displayError && !formData[price]}
            autoFocus
            margin = 'dense'
            label = 'How Much do You Want to Bid For?'
            fullWidth
            variant='standard'
            value={formData[price]}
            onChange={(e)=>handleChangeFormData(price, e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClosePage}>Cancel</Button>
            <Button onClick={handleCreate}>Bid</Button>
        </DialogActions>
    </Dialog>
  );
}
