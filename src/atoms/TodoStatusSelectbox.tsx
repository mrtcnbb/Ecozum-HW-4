import React, { FC, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Status } from '../pages/home/Home';
import axios from 'axios';
import { getCookie } from './CategorySelectbox';
import { baseURL } from '../URL';

type TodoStatusSelectboxProps = {
  inputLabelText: string;
  categoryId: Number;
  selectedId: Number;
};

const TodoStatusSelectbox: FC<TodoStatusSelectboxProps> = ({ inputLabelText, categoryId, selectedId }) => {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<Array<Status>>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const token = getCookie('token');
    axios
      .get(`${baseURL}status?categoryId=${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStatus([...res.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [categoryId]);

  return (
    <FormControl sx={{ mt: 1, mb: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">{inputLabelText}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label="Kategori"
        value={selectedId.toString()}
        onChange={handleChange}
        size="small"
      >
        {status &&
          status.map((stat) => {
            return <MenuItem value={stat.id}>{stat.title}</MenuItem>;
          })}
      </Select>
    </FormControl>
  );
};

export default TodoStatusSelectbox;
