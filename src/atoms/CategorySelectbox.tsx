import React, { FC, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Category } from '../pages/home/Home';

interface CategorySelectboxProps {
  inputLabelText: string;
  categories: Category[];
  onChange: any;
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

const CategorySelectbox: FC<CategorySelectboxProps> = ({ inputLabelText, categories, onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    onChange((prev: any) => ({ ...prev, categoryId: event.target.value }));
  };

  return (
    <FormControl sx={{ mt: 1, mb: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">{inputLabelText}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label="Kategori"
        value={value}
        onChange={handleChange}
        size="small"
      >
        <MenuItem value="">None</MenuItem>
        {categories &&
          categories.map((category) => {
            return <MenuItem value={category.id}>{category.title}</MenuItem>;
          })}
      </Select>
    </FormControl>
  );
};

export default CategorySelectbox;
