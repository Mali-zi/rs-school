import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import styles from './FormFirst.module.scss';
import CustomInput from './CustomInput';
import Eye from './Eye';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { schema } from './Schema';
import CountryList from './CountryList';
import { IFormInput } from '../utils/interfaces';
import { addProfile } from '../features/dataSlice';

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      country: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: IFormInput): void => {
    console.log(data);
    console.log('errors', errors);
    dispatch(addProfile(data));
    navigate('/');
    reset();
  };

  const [firstIsOpen, setFIrstIsOpen] = useState(false);
  const [secIsOpen, setSecIsOpen] = useState(false);
  const editMode = useAppSelector((state) => state.selectedCountries.editMode);

  return (
    <section className="container vh-100 position-relative">
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className={styles.formContainer}>
          <h2 className="text-primary text-center mt-3">Sign in</h2>

          <form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
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
                {errors.age && 'Age is required and not more than 100 years'}
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <CustomInput control={control} />
              {editMode && <CountryList />}
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
