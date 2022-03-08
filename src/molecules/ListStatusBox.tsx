import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { FC, useState } from 'react';
import { getCookie } from '../atoms/CategorySelectbox';
import { Status } from '../pages/home/Home';
import { baseURL } from '../URL';

interface ListStatusBoxProps {
  selectedCategoryId: number;
  statusList: Status[];
  fetchStatuses: (id: number) => void;
}

interface UpdatedStatus {
  title: string;
  categoryId: number;
}

const ListStatusBox: FC<ListStatusBoxProps> = ({ selectedCategoryId, fetchStatuses, statusList }) => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentCId, setCurrentCId] = useState<number>(0);
  const [currentTitle, setCurrentTitle] = useState<string>('');

  const [updatedStatus, setUpdatedStatus] = useState<UpdatedStatus>({} as UpdatedStatus);

  const handleClickOpen = (id: number, cId: number, title: string) => {
    setOpen(true);
    setCurrentId(id);
    setCurrentCId(cId);
    setCurrentTitle(title);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentId(0);
    setCurrentCId(0);
  };

  const onTextChange = (event: any) => {
    setUpdatedStatus((prev) => ({ ...prev, title: event.target.value }));
  };

  const deleteStatus = (id: number) => {
    const token = getCookie('token');
    axios
      .delete(`${baseURL}status/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchStatuses(selectedCategoryId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateStatus = (id: number) => {
    const token = getCookie('token');
    axios
      .put(`${baseURL}status/${id}`, updatedStatus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchStatuses(selectedCategoryId);
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
      {' '}
      {statusList &&
        statusList.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
            >
              <p>
                {item.title} - renk: {item.color}
              </p>
              <Button variant="contained" color="warning" size="small" onClick={() => deleteStatus(item.id)}>
                Sil
              </Button>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => {
                  handleClickOpen(item.id, item.categoryId, item.title);
                }}
              >
                Statü Adı Düzenle
              </Button>
            </Box>
          );
        })}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Statü Adı: {currentTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>Yeni statü adını giriniz:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Statü Adı"
            fullWidth
            variant="standard"
            onChange={(event: any) => onTextChange(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Iptal</Button>
          <Button
            onClick={() => {
              setUpdatedStatus((prev) => ({ ...prev, categoryId: currentCId }));
              updateStatus(currentId);
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

export default ListStatusBox;
