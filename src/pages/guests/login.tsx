import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from 'src/components/form/text-input';
// import Logo from 'src/assets/images/svg/logo.svg';
import Button from 'src/components/form/button';
import { useVerifierLogin } from 'src/redux/user/hooks';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import 'src/assets/images/login-img.png';
import loginImage from 'src/assets/images/login-img.png';
import BetterLife from 'src/assets/images/BetterLife.png';

function LoginPage() {
  const { mutateAsync: signIn, isLoading } = useVerifierLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
  });

  async function submitForm(data: any) {
    let payload = {
      username: DOMPurify.sanitize(data?.username),
      password: DOMPurify.sanitize(data?.password),
    };

    await signIn(payload)
      .then((result) => {
        navigate('/');
      })
      .catch((err) => {
       // console.log(err);  Removed extra comma
      });
  }

  return (
    <div className='w-full min-h-screen flex font-feather'>
      <div className='w-1/2 bg-gray-200'>
        <div className='flex flex-col h-full pt-[73px] pl-[61px]'>
          <div className=''>
            <img src={BetterLife} alt='' />
          </div>

          <div className='text-[#252244]'>
            <p className='mt-[100px] text-6xl'>Sign In</p>
            <p className='pt-4'>Please provide your username and password</p>
            <form
              className='mt-[52px] max-w-[403px]'
              onSubmit={handleSubmit(submitForm)}
            >
              <FormInput
                label='Username'
                type='username'
                name='username'
                validator='email'
                register={register}
                required={true}
                readOnly={isLoading}
                error={errors.email}
                errorMessage={errors.email && errors.email.message}
              />

              <FormInput
                label='Password'
                type='password'
                name='password'
                validator='password'
                register={register}
                required={true}
                readOnly={isLoading}
                error={errors.password}
                errorMessage={errors.password && errors.password.message}
              />
              <div className='flex flex-col '>
                <Button
                  disabled={!isValid}
                  type='submit'
                  loading={isLoading}
                  color='#59C903'
                  className='mt-[80px] bg-[#59C903] p-3 cursor-pointer'
                >
                  <span className='text-white'>Login</span>
                </Button>
                <div className='flex justify-between text-[#59C903] mb-20'>
                  <label className='cursor-pointer flex items-center'>
                    <input type='checkbox' className='mr-2' />
                    Remember me
                  </label>
                  <div className='cursor-pointer'>Forgot Password?</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className='w-1/2 bg-cover '
        style={{ backgroundImage: `url(${loginImage})` }}
      ></div>
    </div>
  );
}

export default LoginPage;
