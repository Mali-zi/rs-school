import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './FormFirst.module.scss';
import Eye from './Eye';

interface IFormInput {
  username: string;
  age: number;
  gender: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
}

type FormSchema = yup.InferType<typeof schema>;

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const schema = yup
  .object({
    username: yup
      .string()
      .matches(/^\S*$/, 'Whitespace is not allowed')
      .min(3, 'Name must be at least 3 characters long')
      .max(10, 'Name must not be more than 10 characters long')
      .required('Name is required'),
    age: yup
      .number()
      .min(18, 'You must be at least 18 years')
      .max(60, 'You must be at most 60 years')
      .positive('Age must be positive')
      .integer()
      .required('Age is required'),
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

export default function FormFirst() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInput): void => {
    console.log(data);
    console.log('errors', errors);
    // console.log('errors.name.type', errors.name.type);
  };

  const [firstIsOpen, setFIrstIsOpen] = useState(false);
  const [secIsOpen, setSecIsOpen] = useState(false);

  return (
    <section className="container vh-100 position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className={styles.formContainer}>
          <form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-primary text-center mt-3">Sign in</h2>
            <div className={styles.inputWrapper}>
              <label htmlFor="username" className="form-label fw-semibold mb-1">
                Name
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="form-control"
                {...register('username')}
              />
              <div className="form-text text-danger">
                {errors.username && errors.username.message}
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="gender" className="form-label fw-semibold mb-1">
                Gender
              </label>
              <select
                id="gender"
                className="form-control"
                {...register('gender')}
              >
                <option value="" disabled>
                  Please Select...
                </option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="age" className="form-label fw-semibold mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                className="form-control"
                {...register('age')}
              />
              <div className="form-text text-danger">
                {errors.age && errors.age.message}
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="country" className="form-label fw-semibold mb-1">
                Country
              </label>
              <input
                type="text"
                id="country"
                autoComplete="country"
                className="form-control"
                {...register('country')}
              />
              <div className="form-text text-danger">
                {errors.country && errors.country.message}
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="email" className="form-label fw-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                className="form-control"
                {...register('email')}
              />
              <div className="form-text text-danger">
                {errors.email && errors.email.message}
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="password" className="form-label fw-semibold mb-1">
                New password
              </label>
              <button
                id="toggle-password1"
                type="button"
                aria-label="Show password as plain text. Warning: this will display your password on the screen."
                className={styles.togglePassword}
                onClick={() => setFIrstIsOpen((prev) => !prev)}
              >
                <Eye isOpen={firstIsOpen} />
              </button>
              <input
                type={firstIsOpen ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                className="form-control"
                {...register('password')}
              />
              <div className="form-text text-danger">
                {errors.password ? errors.password.message : ' '}
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <label
                htmlFor="confirmPassword"
                className="form-label fw-semibold mb-1"
              >
                Confirm new password
              </label>
              <button
                id="toggle-password2"
                type="button"
                aria-label="Show password as plain text. Warning: this will display your password on the screen."
                className={styles.togglePassword}
                onClick={() => setSecIsOpen((prev) => !prev)}
              >
                <Eye isOpen={secIsOpen} />
              </button>
              <input
                type={secIsOpen ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                className="form-control"
                {...register('confirmPassword')}
              />
              <div className="form-text text-danger">
                {errors.confirmPassword && errors.confirmPassword.message}
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                id="accept"
                className="form-check-input"
                {...register('accept')}
              />
              <label htmlFor="accept" className="form-check-label">
                By signing up you agree to our Terms and conditions
              </label>
              <div className="form-text text-danger">
                {errors.accept && errors.accept.message}
              </div>
            </div>

            <div className="text-center">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary mb-3"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
