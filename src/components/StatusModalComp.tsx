import Box from '@mui/material/Box';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { getCookie } from '../atoms/CategorySelectbox';
import AddStatusBox from '../molecules/AddStatusBox';
import ListStatusBox from '../molecules/ListStatusBox';
import { SelectedCategoryIdName, Status } from '../pages/home/Home';
import { baseURL } from '../URL';

interface StatusModalCompProps {
  selectedCategoryIdName: SelectedCategoryIdName;
}

const StatusModalComp: FC<StatusModalCompProps> = ({ selectedCategoryIdName }) => {
  const [status, setStatus] = useState<Array<Status>>([]);

  const fetchStatuses = () => {
    const token = getCookie('token');
    axios
      .get(`${baseURL}status?categoryId=${selectedCategoryIdName.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStatus([...res.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchStatuses();
  }, [selectedCategoryIdName.id]);

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
      <h2>Kategori: {selectedCategoryIdName.title}</h2>
      <AddStatusBox selectedCategoryId={selectedCategoryIdName.id} fetchStatuses={fetchStatuses} />
      <ListStatusBox selectedCategoryId={selectedCategoryIdName.id} fetchStatuses={fetchStatuses} statusList={status} />
    </Box>
  );
};

export default StatusModalComp;
