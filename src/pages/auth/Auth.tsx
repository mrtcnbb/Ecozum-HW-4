import React, { useState, FC } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from 'axios';
import { baseURL } from '../../URL';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// INTERFACE (FUNCTION PROPS)
interface AuthProps {
  setIsLogged: any;
}

const Auth: FC<AuthProps> = ({ setIsLogged }) => {
  const [value, setValue] = useState(0);
  const [registerFormData, setRegisterFormData] = useState<object>({});
  const [loginFormData, setLoginFormData] = useState<object>({});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleRegisterFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setRegisterFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    axios.post(`${baseURL}auth/register`, registerFormData).then((response) => {
      document.cookie = `token=${response.data.token}`;
      setIsLogged(true);
    });
  };

  const handleLogin = () => {
    axios
      .post(`${baseURL}auth/login`, loginFormData)
      .then((response) => {
        document.cookie = `token=${response.data.token}`;
        setIsLogged(true);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="REGISTER" />
          <Tab label="LOGIN" />
        </Tabs>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid rgba( 255, 255, 255, 0.18 )',
              borderRadius: '10px',
              background: 'rgba( 255, 255, 255, 0.3 )',
              boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.25 )',
            }}
            pl={3}
            pr={3}
            pt={4}
            pb={4}
            mt={10}
          >
            <Avatar sx={{ backgroundColor: '#1976d2', marginBottom: '9px' }}>
              <HowToRegIcon />
            </Avatar>
            <TextField
              required
              id="outlined-required"
              name="username"
              label="Username"
              defaultValue="Username"
              size="small"
              margin="normal"
              onChange={handleRegisterFieldChange}
            />
            <TextField
              required
              id="outlined-password-input-register"
              name="password"
              label="Password"
              type="password"
              size="small"
              margin="normal"
              onChange={handleRegisterFieldChange}
            />
            <TextField
              required
              id="outlined-password-input-register-confirm"
              name="passwordConfirm"
              label="Password Confirm"
              type="password"
              size="small"
              margin="normal"
              onChange={handleRegisterFieldChange}
            />
            <Button variant="contained" sx={{ marginTop: '16px' }} onClick={handleRegister}>
              REGISTER
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid rgba( 255, 255, 255, 0.18 )',
              borderRadius: '10px',
              background: 'rgba( 255, 255, 255, 0.3 )',
              boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.25 )',
            }}
            pl={3}
            pr={3}
            pt={4}
            pb={4}
            mt={10}
          >
            <Avatar sx={{ backgroundColor: '#2e7d32', marginBottom: '9px' }}>
              <LoginIcon />
            </Avatar>
            <TextField
              required
              id="outlined-required"
              name="username"
              label="Username"
              defaultValue="Username"
              size="small"
              margin="normal"
              onChange={handleLoginFieldChange}
            />
            <TextField
              required
              id="outlined-password-input-login"
              name="password"
              label="Password"
              type="password"
              size="small"
              margin="normal"
              onChange={handleLoginFieldChange}
            />
            <Button variant="contained" color="success" sx={{ marginTop: '16px' }} onClick={handleLogin}>
              LOGIN
            </Button>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Auth;
