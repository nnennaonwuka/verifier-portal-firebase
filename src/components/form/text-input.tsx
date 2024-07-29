import React from 'react';
import {
  FormValidationTypeProps,
  formValidator,
} from '../../providers/formValidator';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  validator?: FormValidationTypeProps;
  label?: string;
  className?: string;
  value?: any;
  inputRef?: any;
  readOnly?: boolean;
  error?: any;
  errorMessage?: any;
  infos?: string;
  CustomLabel?: React.ReactNode;
  theme?: 'primary' | 'secondary';
  register?: any;
  required?: boolean;
}

const FormInput = ({
  id,
  label,
  name,
  className,
  value,
  inputRef,
  readOnly,
  error,
  errorMessage,
  infos,
  CustomLabel,
  theme,
  register,
  validator,
  required = false,
  ...rest
}: FormInputProps) => {
  return (
    <div className='pb-[16px] w-full'>
      <div className='flex flex-col'>
        <label className='title pb-4' htmlFor={id}>
          {label}
        </label>
        <input
          className={`w-full h-[58px] rounded-[14px]
                    focus:outline-0
                    bg-color-gray title text-color-gray-2 px-4 ${className}`}
          defaultValue={value}
          {...register(name, formValidator[validator!](required))}
          {...rest}
        />
        {CustomLabel}
      </div>
      {error && (
        <span className='text-color-error text-[13px]'>* {errorMessage}</span>
      )}
      {/* {infos && <Info infos={infos} />} */}
    </div>
  );
};

export default FormInput;
