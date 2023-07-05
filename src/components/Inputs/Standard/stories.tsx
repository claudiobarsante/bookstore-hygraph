import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import StandardInput, { StandardInputProps } from '.';
import {
  FieldErrors,
  FormFields,
  validateField
} from '../../../utils/validations';
import { FormValues } from 'components/FormSignUp';

export default {
  title: 'Components/Inputs/StandardInput',
  component: StandardInput,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof StandardInput>;

const Template: ComponentStory<typeof StandardInput> = (
  args: StandardInputProps
) => {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [fieldError, setFieldError] = useState<FieldErrors>({} as FieldErrors);

  const handleOnChange = (
    field: keyof FormValues,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleOnBlur = (field: keyof FormFields) => {
    const errorCheck = validateField(field, values[field]) as FieldErrors;

    //? cleaning previous error
    const hasPreviousError =
      fieldError.hasOwnProperty(field) && !errorCheck.hasOwnProperty(field);
    if (hasPreviousError) {
      setFieldError((previous) => {
        const { [field]: _, ...updatedErrors } = previous;
        return updatedErrors as FieldErrors;
      });
    }

    if (errorCheck.hasOwnProperty(field)) {
      setFieldError((previous) => ({
        ...previous,
        [field]: errorCheck[field]
      }));
    }
  };

  return (
    <StandardInput
      color="lightBlue"
      field="username"
      fieldError={fieldError}
      handleOnBlur={handleOnBlur}
      handleOnChange={handleOnChange}
      label="Username"
      values={values}
      sx={{ marginBottom: '2rem', marginTop: '4rem' }}
    />
  );
};

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  const input = canvas.getByLabelText('Username', { selector: 'input' });

  await userEvent.type(input, 'Anna', {
    delay: 700
  });

  userEvent.tab(); //input lost focus and will call handleOnBlur and show error
};
