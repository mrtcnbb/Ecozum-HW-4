import { Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { FC, useState } from 'react';
import { getCookie } from '../atoms/CategorySelectbox';
import { Category, SelectedCategoryIdName } from '../pages/home/Home';
import { baseURL } from '../URL';

interface ListCategoryBoxProps {
  handleShowStatusModal: () => void;
  categories: Category[];
  fetchCategories: () => void;
  handleSelectedCategoryIdName: (selectedCategoryIdName: SelectedCategoryIdName) => void;
}
interface UpdatedCategory {
  title: string;
}

const ListCategoryBox: FC<ListCategoryBoxProps> = ({
  handleShowStatusModal,
  categories,
  fetchCategories,
  handleSelectedCategoryIdName,
}) => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentTitle, setCurrentTitle] = useState<string>('');

  const [updatedCategory, setUpdatedCategory] = useState<UpdatedCategory>({} as UpdatedCategory);

  const handleClickOpen = (id: number, title: string) => {
    setOpen(true);
    setCurrentId(id);
    setCurrentTitle(title);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentId(0);
  };

  const onTextChange = (event: any) => {
    setUpdatedCategory((prev) => ({ ...prev, title: event.target.value }));
  };

  const deleteCategory = (id: number) => {
    const token = getCookie('token');
    axios
      .delete(`${baseURL}category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchCategories();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateCategory = (id: number) => {
    const token = getCookie('token');
    axios
      .put(`${baseURL}category/${id}`, updatedCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchCategories();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box
      id="list-category-box"
      sx={{
        display: 'flex',
        flexDirection: 'column',
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
      {categories &&
        categories.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
            >
              <p>{item.title}</p>
              <Button variant="contained" color="warning" onClick={() => deleteCategory(item.id)}>
                Sil
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleClickOpen(item.id, item.title);
                }}
              >
                Kategori Adı Düzenle
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleShowStatusModal();
                  handleSelectedCategoryIdName({
                    title: item.title,
                    id: item.id,
                  });
                }}
              >
                Statüleri Düzenle
              </Button>
            </Box>
          );
        })}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Kategori Adı: {currentTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>Yeni kategori adını giriniz:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Kategori Adı"
            fullWidth
            variant="standard"
            onChange={(event: any) => onTextChange(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Iptal</Button>
          <Button
            onClick={() => {
              handleClose();
              updateCategory(currentId);
            }}
          >
            Guncelle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListCategoryBox;
