import { FormValues } from 'components/FormSignUp';
import Joi from 'joi';

const fieldValidations = {
  username: Joi.string().min(5).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'confirmed password does not match with password' })
};

//? I know it sounds repetitive, but it's to name the type in a more meaningful way
export type FieldErrors = FormValues;
export type FormFields = FormValues;

function getFieldErrors(objError: Joi.ValidationResult) {
  const errors = {} as FieldErrors;
  /** Sample error details
 * [
    {
        "message": "\"username\" length must be at least 5 characters long",
        "path": [
            "username"
        ],
        "type": "string.min",
        "context": {
            "limit": 5,
            "value": "123",
            "label": "username",
            "key": "username"
        }
    },
   ...
]
 */
  if (objError.error) {
    objError.error.details.forEach((err) => {
      const errorField = err.path.join('.') as keyof FieldErrors;
      errors[errorField] = err.message;
    });
  }

  return errors;
}

export function signUpValidate(values: FormFields) {
  const schema = Joi.object(fieldValidations);
  return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

type SignInValues = Omit<FormFields, 'username' | 'confirmPassword'>;
export function signInValidate(values: SignInValues) {
  const { email, password } = fieldValidations;
  const schema = Joi.object({ email, password });
  return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

export function validateField(field: keyof FormFields, value: string) {
  const fieldValidation = { [field]: fieldValidations[field] };
  const schema = Joi.object(fieldValidation);

  const { error } = schema.validate({ [field]: value });

  if (!error) return {};

  const fieldError = {} as FieldErrors;
  return { ...fieldError, [field]: error?.message };
}
