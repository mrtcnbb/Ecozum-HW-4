import Box from '@mui/material/Box';
import React, { FC } from 'react';
import AddCategoryBox from '../molecules/AddCategoryBox';
import ListCategoryBox from '../molecules/ListCategoryBox';
import { Category, SelectedCategoryIdName } from '../pages/home/Home';

interface CategoryModalCompProps {
  handleShowStatusModal: () => void;
  categories: Category[];
  handleSetCategory: (category: Category) => void;
  fetchCategories: () => void;
  handleSelectedCategoryIdName: (SelectedCategoryIdName: SelectedCategoryIdName) => void;
}

const CategoryModalComp: FC<CategoryModalCompProps> = ({
  handleShowStatusModal,
  categories,
  handleSetCategory,
  fetchCategories,
  handleSelectedCategoryIdName,
}) => {
  return (
    <Box
      id="add-todo-box"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '700px',
        margin: '20px',
        borderRadius: '10px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        background: 'rgba( 255, 255, 255, 0.2 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.25 )',
        padding: '20px',
      }}
    >
      {' '}
      <AddCategoryBox handleSetCategory={handleSetCategory} />
      <ListCategoryBox
        handleShowStatusModal={handleShowStatusModal}
        categories={categories}
        fetchCategories={fetchCategories}
        handleSelectedCategoryIdName={handleSelectedCategoryIdName}
      />
    </Box>
  );
};

export default CategoryModalComp;
