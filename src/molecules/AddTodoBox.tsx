import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CategorySelectbox, { getCookie } from '../atoms/CategorySelectbox';
import StatusSelectbox from '../atoms/StatusSelectbox';
import Textbox from '../atoms/Textbox';
import { Category, NewTodo } from '../pages/home/Home';
import axios from 'axios';
import { baseURL } from '../URL';

interface AddTodoBoxProps {
  categories: Category[];
  fetchTodos: () => void;
}

const AddTodoBox: FC<AddTodoBoxProps> = (props) => {
  const [newTodo, setNewTodo] = useState<NewTodo>({} as NewTodo);
  const handleSubmit = () => {
    const token = getCookie('token');
    axios
      .post(`${baseURL}todo`, newTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        props.fetchTodos();
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
        inputLabel="Todo Ekle"
        onChange={(event: any) => setNewTodo((prev) => ({ ...prev, title: event.target.value }))}
      />
      <CategorySelectbox {...props} onChange={setNewTodo} inputLabelText="Kategori" />
      <StatusSelectbox categoryId={newTodo?.categoryId! || 0} inputLabelText="Statü" {...props} onChange={setNewTodo} />
      <Button onClick={handleSubmit} variant="contained" color="success" size="small">
        Todo Ekle
      </Button>
    </Box>
  );
};

export default AddTodoBox;
