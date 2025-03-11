import * as yup from 'yup';

/**
 * Common validation schemas for authentication forms
 */
export const authValidation = {
  /**
   * Registration form validation schema
   */
  registration: yup.object({
    name: yup
      .string()
      .required('Name is required')
      .max(255, 'Name must not exceed 255 characters'),
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email')
      .max(255, 'Email must not exceed 255 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    password_confirmation: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  }),

  /**
   * Login form validation schema
   */
  login: yup.object({
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  }),

  /**
   * Password reset form validation schema
   */
  passwordReset: yup.object({
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    password_confirmation: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  }),
}; 