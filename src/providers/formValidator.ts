export type FormValidationTypeProps =
  | 'default'
  | 'email'
  | 'text'
  | 'file'
  | 'password';

export const formValidator = {
  email: (required: boolean) => {
    return {
      required: required ? 'Email address is required' : false,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    };
  },
  text: (required: boolean) => {
    return {
      required: required ? 'This field is required' : false,
      minLength: {
        value: 1,
        message: 'Must be more than 1 character',
      },
    };
  },
  default: (required: boolean) => {
    return {
      required: required ? 'This field cannot be empty' : false,
    };
  },
  password: (required: boolean) => {
    return {
      required: required ? 'This field is required' : false,
      minLength: {
        value: 8,
        message: 'Must be at least 8 characters',
      },
    };
  },
  file: (required: boolean) => {
    return {
      required: required ? 'This field is required' : false,
    };
  },
};
