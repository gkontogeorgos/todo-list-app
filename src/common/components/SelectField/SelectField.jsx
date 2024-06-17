import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { StyledFormItem } from './styles';

const SelectField = ({
  label,
  value,
  htmlFor,
  dataTestId,
  handleChange,
  options,
}) => (
  <StyledFormItem>
    <FormControl fullWidth>
      <InputLabel shrink>{label}</InputLabel>
      <Select
        label={label}
        htmlFor={htmlFor}
        data-testid={dataTestId}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        fullWidth
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </StyledFormItem>
);

export default SelectField;
