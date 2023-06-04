import { TextField } from '@mui/material';

export default function UTextField({
  fullWidth, name, label, type, className, value, error, onChange,
}) {
  return (
    <TextField
      margin="dense"
      name={name}
      label={label}
      type={type}
      className={className}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      error={error}
      helperText={error}
    />
  );
}
