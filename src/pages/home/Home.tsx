import React, { FC, useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LogoutIcon from '@mui/icons-material/Logout';
import TodoComp from '../../components/TodoComp';
import CategoryModalComp from '../../components/CategoryModalComp';
import StatusModalComp from '../../components/StatusModalComp';
import axios from 'axios';
import { baseURL } from '../../URL';
import Box from '@mui/material/Box';

// INTERFACE
interface HomeProps {
  deleteCookie: (name: string) => void;
  setIsLogged: any;
}

export interface Todo {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categoryId: number;
  statusId: number;
}

export interface NewTodo {
  title: string;
  categoryId: number;
  statusId: number;
}

export interface NewCategory {
  title: string;
}

export interface Category {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface Status {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
}

export interface SelectedCategoryIdName {
  title: string;
  id: number;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

const Home: FC<HomeProps> = ({ deleteCookie, setIsLogged }) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [selectedCategoryIdName, setSelectedCategoryIdName] = useState<SelectedCategoryIdName>(
    {} as SelectedCategoryIdName
  );

  const [value, setValue] = useState(0);

  const fetchCategories = () => {
    const token = getCookie('token');
    axios
      .get(`${baseURL}category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories([...res.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleShowCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const handleShowStatusModal = () => {
    setShowStatusModal(true);
  };

  const handleSetCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  const handleSelectedCategoryIdName = (selectedCategoryIdName: SelectedCategoryIdName) => {
    setSelectedCategoryIdName(selectedCategoryIdName);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="icon position tabs example">
        <Tab
          icon={<LogoutIcon />}
          iconPosition="bottom"
          label="logout"
          sx={{ ml: 'auto' }}
          onClick={() => {
            deleteCookie('token');
            setIsLogged(false);
          }}
        />
      </Tabs>
      <Box sx={{ margin: '50px' }}>
        <h1>Todo App</h1>
      </Box>
      <TodoComp handleShowCategoryModal={handleShowCategoryModal} categories={categories} />
      {showCategoryModal && (
        <CategoryModalComp
          handleShowStatusModal={handleShowStatusModal}
          categories={categories}
          handleSetCategory={handleSetCategory}
          fetchCategories={fetchCategories}
          handleSelectedCategoryIdName={handleSelectedCategoryIdName}
        />
      )}
      {showStatusModal && <StatusModalComp selectedCategoryIdName={selectedCategoryIdName} />}
    </div>
  );
};

export default Home;
