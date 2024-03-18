import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const RentalForm = () => {
  // State for form fields
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState([]);
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [rentRate, setRentRate] = React.useState('');
  const [rentType, setRentType] = React.useState('');

  // Handle category selection
  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  return (
    <div>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Autocomplete
        multiple
        id="category"
        options={['Electronics', 'Furniture', 'Clothing', 'Books', 'Other']}
        value={category}
        onChange={handleCategoryChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Rent Rate"
        variant="outlined"
        fullWidth
        value={rentRate}
        onChange={(e) => setRentRate(e.target.value)}
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel>Rent Type</InputLabel>
        <Select
          value={rentType}
          onChange={(e) => setRentType(e.target.value)}
          label="Rent Type"
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default RentalForm;
