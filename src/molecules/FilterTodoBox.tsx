import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { FC, useEffect, useState } from 'react';
import CategorySelectbox from '../atoms/CategorySelectbox';
import StatusSelectbox from '../atoms/StatusSelectbox';
import { Category } from '../pages/home/Home';

interface FilterTodoBoxProps {
  categories: Category[];
  onChange?: any;
  handleFilter?: any;
  resetFilter?: any;
}

const FilterTodoBox: FC<FilterTodoBoxProps> = ({ categories, onChange, handleFilter, resetFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState<any>({});

  useEffect(() => {
    onChange((prev: any) => ({ ...prev, categoryId: selectedCategory.categoryId }));
  }, [selectedCategory]);

  return (
    <Box
      id="filter-todo-box"
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
      <CategorySelectbox inputLabelText="Kategori" categories={categories} onChange={setSelectedCategory} />
      <StatusSelectbox inputLabelText="Statü" onChange={onChange} categoryId={selectedCategory.categoryId} />
      <Button variant="contained" color="success" size="small" onClick={() => handleFilter()}>
        Filtrele
      </Button>
      <Button onClick={resetFilter} variant="contained" color="warning" size="small" sx={{ ml: '8px' }}>
        Filtreyi Sil
      </Button>
    </Box>
  );
};

export default FilterTodoBox;
