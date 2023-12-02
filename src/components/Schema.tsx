import * as yup from 'yup';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

export const schema = yup
  .object({
    username: yup
      .string()
      .matches(/^\S*$/, 'Whitespace is not allowed')
      .min(3, 'Name must be at least 3 characters long')
      .max(10, 'Name must not be more than 10 characters long')
      .required('Name is required'),
    age: yup.number().integer().positive().required().max(100),
    gender: yup
      .string()
      .oneOf(['male', 'female', 'other'] as const)
      .required('Gender is required'),
    country: yup.string().required('Country is required'),
    email: yup.string().email().required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(32, 'Password length must not be more than 32 characters')
      .matches(/^\S*$/, 'Whitespace is not allowed')
      .matches(/[0-9]/, getCharacterValidationError('digit'))
      .matches(/[a-z]/, getCharacterValidationError('lowercase'))
      .matches(/[A-Z]/, getCharacterValidationError('uppercase'))
      .matches(/[@$!%*#?&+=()]/, getCharacterValidationError('special'))
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    accept: yup
      .boolean()
      .oneOf([true], 'Your agreement is required')
      .required('Your agreement is required'),
  })
  .required();
