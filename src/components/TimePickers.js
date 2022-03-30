import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';

export default function TimePickers(prop) {
  const {stateRef} = prop
  const [value, setValue] = React.useState(new Date())

  React.useEffect(()=>{
    stateRef.current = value
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DatePicker
          label="Date"
          openTo="year"
          views={['year', 'month', 'day']}
          value={value}
          onChange={(newValue) => {setValue(newValue);console.log(value)}}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}