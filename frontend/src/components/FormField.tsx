import React from 'react';
import { TextField } from '@mui/material';

interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, required = false, type = 'text' }) => {
  return (
    <TextField
      margin="normal"
      required={required}
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormField;
