import { Preview } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { FC, useState } from 'react';
import { getCookie } from '../atoms/CategorySelectbox';
import Textbox from '../atoms/Textbox';
import { Category } from '../pages/home/Home';
import { baseURL } from '../URL';

interface AddCategoryBoxProps {
  handleSetCategory: (category: Category) => void;
}

interface NewCategory {
  title: string;
}

const AddCategoryBox: FC<AddCategoryBoxProps> = ({ handleSetCategory }) => {
  const [newCategory, setNewCategory] = useState<NewCategory>({} as NewCategory);

  const handleSubmit = () => {
    const token = getCookie('token');
    axios
      .post(`${baseURL}category`, newCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        handleSetCategory(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box
      id="add-todo-box"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        border: '1px solid mediumpurple',
        borderRadius: '10px',
        margin: '5px',
        padding: '5px',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.15 )',
      }}
    >
      {' '}
      <Textbox
        inputLabel="Kategori Ekle"
        onChange={(event: any) => setNewCategory((prev) => ({ ...prev, title: event.target.value }))}
      />
      <Button onClick={handleSubmit} variant="contained" color="success" size="small">
        Kategori Ekle
      </Button>
    </Box>
  );
};

export default AddCategoryBox;
