import React, { useRef, useState } from 'react';
import styles from './FormFirst.module.scss';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import Eye from './Eye';
import { schema } from './Schema';
import { addProfile } from '../features/dataSlice';
import { fileToBase64 } from '../utils/fileToBase64';
import { IErrors } from '../utils/interfaces';
import { allCountries } from '../utils/const';

export default function FormSec() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [firstIsOpen, setFIrstIsOpen] = useState(false);
  const [secIsOpen, setSecIsOpen] = useState(false);
  const initErrors = {
    username: false,
    age: false,
    gender: false,
    image: false,
    country: false,
    email: false,
    password: false,
    confirmPassword: false,
    accept: false,
  };

  const [errors, setErrors] = useState(initErrors);
  const nameRef = useRef<null | HTMLInputElement>(null);
  const genderRef = useRef<null | HTMLSelectElement>(null);
  const ageRef = useRef<null | HTMLInputElement>(null);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const confirmPasswordRef = useRef<null | HTMLInputElement>(null);
  const acceptRef = useRef<null | HTMLInputElement>(null);
  const countryRef = useRef<null | HTMLSelectElement>(null);
  const imageRef = useRef<null | HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let tempFileList = { fileName: '', base64String: '' };
    const files = imageRef.current?.files;
    if (files) {
      const file = files[0];
      tempFileList = {
        fileName: file.name,
        base64String:
          file.type.indexOf('image') > -1 ? await fileToBase64(file) : '',
      };
    }

    const data = {
      username: nameRef.current?.value,
      age: ageRef.current?.valueAsNumber,
      gender: genderRef.current?.value,
      image: tempFileList.base64String,
      country: countryRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      accept: acceptRef.current?.checked,
    };

    const isFormValid = await schema.isValid(data, {
      abortEarly: false,
    });

    if (isFormValid) {
      setErrors(initErrors);
      dispatch(addProfile(data));
      navigate('/');
    } else {
      schema.validate(data, { abortEarly: false }).catch((err) => {
        const addErrors = err.inner.reduce(
          (acc: IErrors, error: ValidationError) => {
            if (error.path) {
              return {
                ...acc,
                [error.path]: true,
              };
            }
          },
          {}
        );
        setErrors(addErrors);
      });
    }
  };

  return (
    <>
      <section className="container vh-100 position-relative">
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className={styles.formContainer}>
            <h2 className="text-primary text-center mt-3">Sign in</h2>

            <form
              className={styles.signUpForm}
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className={styles.inputWrapper}>
                <label
                  htmlFor="username"
                  className="form-label fw-semibold mb-1"
                >
                  Name
                </label>
                <input
                  id="username"
                  type="text"
                  ref={nameRef}
                  autoComplete="username"
                  className="form-control"
                />
                <div className="form-text text-danger">
                  {errors.username && (
                    <span>
                      Name is required, must be at least 3 and less than 10
                      characters long. Whitespace is not allowed.
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="gender" className="form-label fw-semibold mb-1">
                  Gender
                </label>
                <select id="gender" ref={genderRef} className="form-control">
                  <option value="" disabled>
                    Please Select...
                  </option>
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
                </select>
                <div className="form-text text-danger">
                  {errors.gender && <span>Gender is required.</span>}
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="age" className="form-label fw-semibold mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  ref={ageRef}
                  className="form-control"
                />
                <div className="form-text text-danger">
                  {errors.age && (
                    <span>
                      Age is required, must be positive and not more than 100.
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="image" className="form-label fw-semibold mb-1">
                  Picture
                </label>
                <input
                  id="image"
                  type="file"
                  ref={imageRef}
                  accept="image/png, image/jpeg"
                  multiple={false}
                  className="form-control"
                />
              </div>

              <div className={styles.inputWrapper}>
                <label
                  htmlFor="country"
                  className="form-label fw-semibold mb-1"
                >
                  Country
                </label>
                <select id="country" ref={countryRef} className="form-control">
                  <option value="" disabled>
                    Please Select...
                  </option>
                  {allCountries.map((country) => {
                    return (
                      <option value="female" key={country}>
                        {country}
                      </option>
                    );
                  })}
                </select>
                <div className="form-text text-danger">
                  {errors.country && <span>Country is required.</span>}
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="email" className="form-label fw-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="email"
                  className="form-control"
                />
                <div className="form-text text-danger">
                  {errors.email && <span>Email is required.</span>}
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <label
                  htmlFor="password"
                  className="form-label fw-semibold mb-1"
                >
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
                  ref={passwordRef}
                  autoComplete="new-password"
                  className="form-control"
                />
                <div className="form-text text-danger">
                  {errors.password && (
                    <span>
                      Password is required, must be at least 8 characters and
                      must have at least one digit, one lowercase, one uppercase
                      and one special character.
                    </span>
                  )}
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
                  ref={confirmPasswordRef}
                  autoComplete="new-password"
                  className="form-control"
                />
                <div className="form-text text-danger">
                  {errors.confirmPassword && (
                    <span>
                      Confirm Password is required. Passwords must match.
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  id="accept"
                  ref={acceptRef}
                  className="form-check-input"
                />
                <label htmlFor="accept" className="form-check-label">
                  By signing up you agree to our Terms and conditions
                </label>
                <div className="form-text text-danger">
                  {errors.accept && <span>Your agreement is required.</span>}
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
    </>
  );
}
