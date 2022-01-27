import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_BID_MUTATION } from '../graphql';

const price = 'price'

const initialData = {
    [price]: '',
}

export default function Bid(props){

  const {open, handleClose, username, team, date} = props 

  const [formData, setFormData] = useState(initialData);
  const [displayError, setDisplayError] = useState(false);
  const [newprice, setNewPrice] = useState(0)

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
            name: username,
            bid: date+'-'+team+'-'+parseInt(formData['price']),
            price: parseInt(formData['price'])
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
