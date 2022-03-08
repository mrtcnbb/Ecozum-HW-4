import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import React, { FC, useState } from 'react';
import { getCookie } from '../atoms/CategorySelectbox';
import Textbox from '../atoms/Textbox';
import { baseURL } from '../URL';

interface NewStatus {
  title: string;
  categoryId: number;
  color: string;
}

interface AddCategoryBoxProps {
  selectedCategoryId: number;
  fetchStatuses: () => void;
}

const AddStatusBox: FC<AddCategoryBoxProps> = ({ selectedCategoryId, fetchStatuses }) => {
  const [newStatus, setNewStatus] = useState<NewStatus>({} as NewStatus);

  const handleSubmit = () => {
    const token = getCookie('token');
    axios
      .post(
        `${baseURL}status`,
        { ...newStatus, categoryId: selectedCategoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        fetchStatuses();
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
        inputLabel="Statü Ekle"
        onChange={(event: any) => setNewStatus((prev) => ({ ...prev, title: event.target.value }))}
      />
      <Textbox
        inputLabel="Renk Ekle"
        onChange={(event: any) => setNewStatus((prev) => ({ ...prev, color: event.target.value }))}
      />
      <Button variant="contained" color="success" size="small" onClick={handleSubmit}>
        Statü Ekle
      </Button>
    </Box>
  );
};

export default AddStatusBox;
