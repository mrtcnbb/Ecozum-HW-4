import { FC } from 'react';
import TextField from '@mui/material/TextField';

interface TextboxProps {
  inputLabel: string;
  onChange?: any;
}

const Textbox: FC<TextboxProps> = ({ inputLabel, onChange }) => {
  return <TextField required id="outlined-required" name="title" label={inputLabel} size="small" onChange={onChange} />;
};

export default Textbox;
