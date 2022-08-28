import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { useAuth } from '../../contexts/auth-contexts';
import { auth } from '../../firebase/config';

import { Button } from '../../components/button';
import { Input } from '../../components/input';
import IconEyeClosed from '../../components/icons/IconEyeClosed';
import IconEyeOpened from '../../components/icons/IconEyeOpened';
import { Label } from '../../components/label';

const SignIn = () => {
  const [checkEye, setCheckEye] = useState(false);
  const [checkEyeClicked, setCheckEyeClicked] = useState(false);
  const [errorWithLogin, setErrorWithLogin] = useState(false);

  const { userInfo } = useAuth();
  const navigage = useNavigate();
  useEffect(() => {
    document.title = 'Trang đăng nhập | Paradise for pets';
    if (userInfo?.email) navigage('/');
  }, []);
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Vui lòng nhập email của bạn')
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Không đúng định dạng email'
        ),
      password: Yup.string().required('Vui lòng nhập mật khẩu'),
    }),
    onSubmit: async (values, actions) => {
      if (!formik.isValid) return;

      await signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          toast.success('Đăng nhập thành công', {
            autoClose: 1000,
            closeOnClick: true,
            pauseOnHover: false,
            hideProgressBar: false,
          });

          navigage('/');
        })
        .catch((err) => setErrorWithLogin(true));
    },
  });

  // logic check eye
  useEffect(() => {
    if (formik.values.password.length > 0) setCheckEye(true);
    else setCheckEye(false);
    return () => {};
  }, [formik.values.password.length]);
  const handleClickEye = () => {
    setCheckEyeClicked(!checkEyeClicked);
  };

  return (
    <>
      {!userInfo ? (
        <>
          <form
            className='flex flex-col mx-auto my-10 w-fit'
            onSubmit={formik.handleSubmit}
            autoComplete='on'
          >
            <div className='flex flex-col mb-6 gap-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                placeholder='Vui lòng nhập email'
                id='email'
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <p className='text-red-500'>{formik.errors.email}</p>
              )}
            </div>
            <div className='flex flex-col mb-6 gap-y-2'>
              <Label htmlFor='password'>Mật khẩu</Label>
              <div className='relative w-fit'>
                <Input
                  className
                  type={`${checkEyeClicked ? 'text' : 'password'}`}
                  placeholder='Vui lòng nhập mật khẩu'
                  id='password'
                  {...formik.getFieldProps('password')}
                />
                {checkEye ? (
                  <>
                    {checkEyeClicked ? (
                      <>
                        <IconEyeOpened onClick={handleClickEye}></IconEyeOpened>
                      </>
                    ) : (
                      <IconEyeClosed onClick={handleClickEye}></IconEyeClosed>
                    )}
                  </>
                ) : null}
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className='text-red-500'>{formik.errors.password}</p>
              )}
              {errorWithLogin ? (
                <p className='text-red-500'>
                  Tên đăng nhập hoặc mật khẩu không đúng
                </p>
              ) : null}
            </div>
            <Button type='submit' className='w-full py-3 tracking-wider'>
              Đăng Nhập
            </Button>
            <p className='w-full m-6 text-center'>
              Bạn chưa có tài khoản ?? Hãy quay lại{' '}
              <Link to={'/sign-up'}>
                <span className='text-blue-500'>Đăng ký</span>
              </Link>
            </p>
          </form>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center mx-auto mt-14 gap-y-6'>
          <p className='text-3xl font-semibold'>
            Bạn đã đăng nhập vui lòng trở lại trang chủ
          </p>
          <div>
            <Link to={'/'}>
              <Button type='button' className='mr-auto mt-7 '>
                Trang chủ
              </Button>
            </Link>
            <Button
              onClick={() => navigage(-1)}
              type='button'
              className='mr-auto text-white bg-transparent border-2 border-blue-500 mt-7 ml-9'
            >
              Quay lại
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
