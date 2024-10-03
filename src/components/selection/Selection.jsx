import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Selection = ({ sendDataToParent }) => {
  const [day, setDay] = React.useState(3);

  const handleChange = (event) => {
    setDay(event.target.value);
    sendDataToParent(event.target.value);
  };
  return (
    <div className="selection">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth className="form-control">
          <InputLabel id="demo-simple-select-label">Gün</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={day} label="Age" onChange={handleChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={365}>365</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default Selection;
