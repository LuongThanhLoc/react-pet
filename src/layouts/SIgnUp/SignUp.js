import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { auth, db } from '../../firebase/config';
import { useAuth } from '../../contexts/auth-contexts';

import { Button } from '../../components/button';
import { Input } from '../../components/input';
import IconEyeClosed from '../../components/icons/IconEyeClosed';
import IconEyeOpened from '../../components/icons/IconEyeOpened';
import { Label } from '../../components/label';

const SignUp = () => {
  const [checkEyePassword, setCheckEyePassword] = useState(false);
  const [checkEyeConfirmPassword, setCheckEyeConfirmPassword] = useState(false);
  const [checkEyePasswordClicked, setCheckEyePasswordClicked] = useState(false);
  const [checkEyeConfirmPasswordClicked, setCheckEyeConfirmPasswordClicked] =
    useState(false);

  const [checkEmailValidate, setCheckEmailValidate] = useState(false);

  const navigage = useNavigate();
  const { userInfo } = useAuth();

  useEffect(() => {
    document.title = 'Trang đăng ký | Paradise for pets';
    if (userInfo?.email) navigage('/');
    return () => {};
  }, [navigage, userInfo?.email]);

  const formik = useFormik({
    initialValues: {
      firstLastName: '',
      numberPhone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstLastName: Yup.string()
        .required('Vui lòng nhập họ và tên của bạn')
        .min(4, 'Họ và tên phải lớn hơn 4 kí tự'),
      numberPhone: Yup.string()
        .required('Vui lòng nhập số điện thoại của bạn')
        .matches(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
          'Vui lòng nhập đúng định danh số điện thoại'
        ),
      email: Yup.string()
        .required('Vui lòng nhập email của bạn')
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Không đúng định dạng email'
        ),
      password: Yup.string()
        .required('Vui lòng nhập mật khẩu')
        .matches(
          /^[0-9a-zA-Z]{8,23}$/,
          'Mật khẩu cần có ít nhất tám kí tự và nhỏ hơn 23 kí tự'
        ),
      confirmPassword: Yup.string()
        .required('Vui lòng nhập lại mật khẩu')
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp nhau'),
    }),
    onSubmit: async (values, actions) => {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          setCheckEmailValidate(false);
        })
        .catch(() => setCheckEmailValidate(true));
      await updateProfile(auth.currentUser, {
        displayName: values.firstLastName,
      });
      const colRef = collection(db, 'users-pet-ui');
      await addDoc(colRef, {
        firstLastName: values.firstLastName,
        numberPhone: values.numberPhone,
        email: values.email,
        password: values.password,
      });
      setTimeout(() => {
        actions.resetForm({
          firstLastName: '',
          numberPhone: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }, addDoc);
      toast.success('Tạo tài khoản thành công', {
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
        hideProgressBar: false,
      });
      navigage('/');
    },
  });

  // logic check eye
  useEffect(() => {
    if (formik.values.password.length > 0) setCheckEyePassword(true);
    else setCheckEyePassword(false);
    if (formik.values.confirmPassword.length > 0)
      setCheckEyeConfirmPassword(true);
    else setCheckEyeConfirmPassword(false);
  }, [formik.values.confirmPassword.length, formik.values.password.length]);

  const handleClickEyePassword = () => {
    setCheckEyePasswordClicked(!checkEyePasswordClicked);
  };
  const handleClickEyeConfirmPassword = () => {
    setCheckEyeConfirmPasswordClicked(!checkEyeConfirmPasswordClicked);
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
              <Label htmlFor='firstLastName'>Họ Và Tên</Label>
              <Input
                type='text'
                placeholder='Vui lòng nhập họ và tên'
                id='firstLastName'
                {...formik.getFieldProps('firstLastName')}
              />
              {formik.touched.firstLastName && formik.errors.firstLastName && (
                <p className='text-red-500'>{formik.errors.firstLastName}</p>
              )}
            </div>
            <div className='flex flex-col mb-6 gap-y-2'>
              <Label htmlFor='numberPhone'>Số Điện Thoại</Label>
              <Input
                type='text'
                placeholder='Vui lòng nhập số điện thoại'
                id='numberPhone'
                {...formik.getFieldProps('numberPhone')}
              />
              {formik.touched.numberPhone && formik.errors.numberPhone && (
                <p className='text-red-500'>{formik.errors.numberPhone}</p>
              )}
            </div>
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
                  type={`${checkEyePasswordClicked ? 'text' : 'password'}`}
                  placeholder='Vui lòng nhập mật khẩu'
                  id='password'
                  {...formik.getFieldProps('password')}
                />
                {checkEyePassword ? (
                  <>
                    {checkEyePasswordClicked ? (
                      <>
                        <IconEyeOpened
                          onClick={handleClickEyePassword}
                        ></IconEyeOpened>
                      </>
                    ) : (
                      <IconEyeClosed
                        onClick={handleClickEyePassword}
                      ></IconEyeClosed>
                    )}
                  </>
                ) : null}
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className='text-red-500'>{formik.errors.password}</p>
              )}
            </div>
            <div className='flex flex-col mb-6 gap-y-2'>
              <Label htmlFor='confirmPassword'>Nhập Lại Mật khẩu</Label>
              <div className='relative w-fit'>
                <Input
                  type={`${
                    checkEyeConfirmPasswordClicked ? 'text' : 'password'
                  }`}
                  placeholder='Vui lòng nhập lại mật khẩu'
                  id='confirmPassword'
                  {...formik.getFieldProps('confirmPassword')}
                />
                {checkEyeConfirmPassword ? (
                  <>
                    {checkEyeConfirmPasswordClicked ? (
                      <>
                        <IconEyeOpened
                          onClick={handleClickEyeConfirmPassword}
                        ></IconEyeOpened>
                      </>
                    ) : (
                      <IconEyeClosed
                        onClick={handleClickEyeConfirmPassword}
                      ></IconEyeClosed>
                    )}
                  </>
                ) : null}
              </div>
              {checkEmailValidate && (
                <p className='mt-2 text-red-500'>
                  Email này đã được đăng ký. Vui lòng nhập email khác của bạn!{' '}
                </p>
              )}
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className='text-red-500'>
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
            {formik.isSubmitting && formik.isValid ? (
              <>
                <Button
                  type='submit'
                  className='box-border w-full py-3 cursor-not-allowed'
                >
                  <div className='w-5 h-5 mx-auto bg-transparent border-2 border-l-0 border-r-0 border-white rounded-full animate-spin'></div>
                </Button>
              </>
            ) : (
              <Button
                type='submit'
                className='box-border w-full py-3 tracking-wider'
              >
                Đăng Ký
              </Button>
            )}

            <p className='w-full m-6 mx-auto text-center'>
              Bạn đã có tài khoản ?? Hãy quay lại{' '}
              <Link to={'/sign-in'}>
                <span className='text-blue-500'>Đăng nhập</span>
              </Link>
            </p>
          </form>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center mx-auto mt-14 gap-y-6'>
          <p className='text-3xl font-semibold'>
            Bạn đã đăng ký thành công vui lòng trở lại trang chủ hoặc đăng nhập!
          </p>
          <div>
            <Link to={'/'}>
              <Button type='button' className='mr-auto mt-7 '>
                Trang chủ
              </Button>
            </Link>
            <Link to={'/sign-in'}>
              <Button
                type='button'
                className='mr-auto text-white bg-transparent border-2 border-blue-500 mt-7 ml-9'
              >
                {' '}
                Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
