import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch } from '../../Hooks';
import { sortByPrice } from "../../Store/products/products.slice"

export default function SortByPrice() {
  const [priceFilter, setPriceFilter] = React.useState('');
  const dispatch = useAppDispatch()

  const handleChange = (event: SelectChangeEvent) => {
    setPriceFilter(event.target.value);
  };

  React.useEffect(() => {
    dispatch(sortByPrice(priceFilter))
  }, [priceFilter]);

  return (
    <Box sx={{ minWidth: 100 }} mx={{ width: 90 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priceFilter}
          label="priceFilter"
          onChange={handleChange}
        >
          <MenuItem value={"lowest"}>Price (Lowest)</MenuItem>
          <MenuItem value={"highest"}>Price (Highest)</MenuItem>
          <MenuItem value={"A-Z"}>Name (A-Z)</MenuItem>
          <MenuItem value={"Z-A"}>Name (Z-A)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
