import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import { FC, useState } from 'react';
import { Category, Todo } from '../pages/home/Home';
import CategorySelectbox, { getCookie } from '../atoms/CategorySelectbox';
import TodoStatusSelectbox from '../atoms/TodoStatusSelectbox';
import StatusSelectbox from '../atoms/StatusSelectbox';
import { baseURL } from '../URL';

interface ListTodoBoxProps {
  categories: Category[];
  list: any;
  fetchTodos: () => void;
}

interface UpdatedTodo {
  title: string;
  categoryId: number;
  statusId: number;
}

const ListTodoBox: FC<ListTodoBoxProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState<UpdatedTodo>({} as UpdatedTodo);
  const [currentTodoName, setCurrentTodoName] = useState('');
  const [currentTodoId, setCurrentTodoId] = useState<number>(0);

  const handleClickOpen = (todoName: string, todoId: number) => {
    setOpen(true);
    setCurrentTodoName(todoName);
    setUpdatedTodo((prev) => ({ ...prev, title: todoName }));
    setCurrentTodoId(todoId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (id: number) => {
    const token = getCookie('token');
    axios
      .put(`${baseURL}todo/${id}`, updatedTodo, {
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

  const deleteTodo = (id: number) => {
    const token = getCookie('token');
    axios
      .delete(`${baseURL}todo/${id}`, {
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
        flexDirection: 'column',
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
      {props.list &&
        props.list.map((item: Todo) => {
          return (
            <Box
              key={item.id}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
            >
              <p>{item.title}</p>
              <FormControl sx={{ mt: 1, mb: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Kategori</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Kategori"
                  value={item.categoryId}
                  size="small"
                >
                  <MenuItem value="">None</MenuItem>
                  {props.categories &&
                    props.categories.map((category) => {
                      return (
                        <MenuItem key={category.id} value={category.id}>
                          {category.title}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <TodoStatusSelectbox categoryId={item.categoryId} inputLabelText="Statü" selectedId={item.statusId} />
              <Button variant="contained" color="warning" size="small" onClick={() => deleteTodo(item.id)}>
                Sil
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleClickOpen(item.title, item.id)}
              >
                Düzenle
              </Button>
            </Box>
          );
        })}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Todo: {currentTodoName}</DialogTitle>
        <DialogContent>
          <DialogContentText>Todo'nun yeni kategori adını ve statüsünü seçiniz:</DialogContentText>
          <CategorySelectbox {...props} onChange={setUpdatedTodo} inputLabelText="Kategori" />
          <StatusSelectbox
            categoryId={updatedTodo?.categoryId! || 0}
            inputLabelText="Statü"
            {...props}
            onChange={setUpdatedTodo}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Iptal</Button>
          <Button
            onClick={() => {
              handleSubmit(currentTodoId);
              handleClose();
            }}
          >
            Guncelle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListTodoBox;
