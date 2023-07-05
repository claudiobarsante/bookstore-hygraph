import TextField from '@mui/material/TextField';
import { FormValues } from 'components/FormSignUp';
import { FieldErrors, FormFields } from 'utils/validations';
import { SxProps, Theme } from '@mui/material/styles';
import { Colors } from 'styles/theme/colors';

export type StandardInputProps = {
  color: keyof typeof Colors;
  field: keyof FormFields;
  fieldError: FieldErrors;
  handleOnBlur: (field: keyof FormFields) => void;
  handleOnChange: (
    field: keyof FormFields,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  label: string;
  values: FormValues;
  sx?: SxProps<Theme>;
};

const StandardInput = ({
  color,
  field,
  fieldError,
  handleOnBlur,
  handleOnChange,
  label,
  values,
  sx
}: StandardInputProps) => {
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
    <TextField
      id={field}
      aria-label={`input for ${field}`}
      fullWidth
      label={label}
      onBlur={() => handleOnBlur(field)}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleOnChange(field, event)
      }
      value={values[field]}
      error={fieldError.hasOwnProperty(field)}
      helperText={fieldError[`${field}`]}
      variant="standard"
      sx={mergedStyles}
    />
  );
};

export default StandardInput;
