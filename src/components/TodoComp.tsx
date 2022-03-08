import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { getCookie } from '../atoms/CategorySelectbox';
import AddTodoBox from '../molecules/AddTodoBox';
import FilterTodoBox from '../molecules/FilterTodoBox';
import ListTodoBox from '../molecules/ListTodoBox';
import { Category, Todo } from '../pages/home/Home';
import { baseURL } from '../URL';

interface TodoCompProps {
  handleShowCategoryModal: () => void;
  categories: Category[];
}

interface FilterParamsProps {
  categoryId: number;
  statusId: number;
}

const TodoComp: FC<TodoCompProps> = (props) => {
  const [filterParams, setFilterParams] = useState<FilterParamsProps>({} as FilterParamsProps);
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [renderList, setRenderList] = useState<Array<Todo>>([] as Array<Todo>);

  const fetchTodos = () => {
    const token = getCookie('token');
    axios
      .get(`${baseURL}todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTodos([...res.data]);
        setRenderList([...res.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleFilter = () => {
    let newList = [...todos].filter((item) => {
      return item.categoryId === filterParams.categoryId && item.statusId === filterParams.statusId;
    });

    setRenderList([...newList]);
  };

  return (
    <Box
      id="todo-comp"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '700px',
        margin: '20px',
        borderRadius: '10px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        background: 'rgba( 255, 255, 255, 0.3 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.25 )',
        padding: '20px',
      }}
    >
      {' '}
      <FilterTodoBox
        {...props}
        onChange={setFilterParams}
        handleFilter={handleFilter}
        resetFilter={() => setRenderList(todos)}
      />
      <AddTodoBox {...props} fetchTodos={fetchTodos} />
      <ListTodoBox fetchTodos={fetchTodos} {...props} list={renderList} />
      <Button variant="contained" onClick={props.handleShowCategoryModal}>
        Kategorileri Düzenle
      </Button>
    </Box>
  );
};

export default TodoComp;
