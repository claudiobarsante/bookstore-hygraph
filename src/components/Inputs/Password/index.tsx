import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@mui/material';
// -- Material Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// -- Types
import { StandardInputProps } from '../Standard';
import { Colors } from 'styles/theme/colors';

type PasswordInputProps = Omit<StandardInputProps, 'label'>;

const PasswordInput = ({
  color,
  field,
  fieldError,
  handleOnBlur,
  handleOnChange,
  sx,
  values
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleOnClickShowPassword = () => {
    setShowPassword((previous) => !previous);
  };

  const handleOnMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const textCustomStyle = {
    '& label.Mui-focused': {
      color: Colors[color]
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: Colors[color]
    }
  };
  const mergedStyles = { ...textCustomStyle, ...sx };

  return (
    <FormControl variant="standard" fullWidth sx={mergedStyles}>
      <InputLabel htmlFor={field}>Password</InputLabel>
      <Input
        aria-label={`input for ${field}`}
        id={field}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={`toggle ${field} visibility`}
              onClick={handleOnClickShowPassword}
              onMouseDown={handleOnMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChange(field, event)
        }
        type={showPassword ? 'text' : 'password'}
        value={values[field]}
        error={fieldError.hasOwnProperty(field)}
        onBlur={() => handleOnBlur(field)}
      />
      <FormHelperText
        id="component-error-text"
        aria-labelledby={field}
        error={fieldError.hasOwnProperty(field)}
      >
        {fieldError[field]}
      </FormHelperText>
    </FormControl>
  );
};

export default PasswordInput;
