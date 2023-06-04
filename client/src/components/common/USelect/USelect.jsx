import { TextField, MenuItem } from '@mui/material';

export default function USelect({
  name, label, type, value, options, onChange,
}) {
  return (
    <TextField
      margin="dense"
      name={name}
      label={label}
      type={type}
      fullWidth
      value={value}
      select
      onChange={onChange}
    >
      {
        options.map((o) => (
          <MenuItem
            key={o.key}
            value={o.value}
          >
            {o.key}
          </MenuItem>
        ))
      }
    </TextField>
  );
}
