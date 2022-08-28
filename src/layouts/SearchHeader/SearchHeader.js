import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useAuth } from '../../contexts/auth-contexts';

import Button from '../../components/button/Button';

const SearchHeader = () => {
  const [errorWithLogin, setErrorWithLogin] = useState(false);

  const { userInfo } = useAuth();

  return (
    <>
      <form className='flex items-center justify-center py-5 gap-x-10'>
        <h1>Paradise for pets</h1>
        <div className='flex rounded-md border-[0.1px] border-primaryColor w-[500px]'>
          <input
            className='w-full px-5 py-2 border-2 outline-none border-primaryColor'
            placeholder='Tên thú cưng bạn muốn biết thông tin ...'
            type='text'
            name='infoPet'
          ></input>
          <button className='box-border px-5 py-2 text-center bg-primaryColor'>
            <i className='text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </i>
          </button>
        </div>
        {userInfo?.displayName ? (
          <>
            <span>
              Xin chào <strong>{userInfo.displayName}</strong>
            </span>
            <Button
              type='button'
              className='w-[150px]'
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    toast.success('Đăng xuất thành công', {
                      autoClose: 1000,
                      closeOnClick: true,
                      pauseOnHover: false,
                      hideProgressBar: false,
                    });
                  })
                  .catch((err) => setErrorWithLogin(true));
              }}
            >
              Đăng xuất
            </Button>
            {errorWithLogin
              ? toast.error('Đăng xuất thành công', {
                  autoClose: 1000,
                  closeOnClick: true,
                  pauseOnHover: false,
                  hideProgressBar: false,
                })
              : null}
          </>
        ) : (
          <>
            <Link to={'/sign-up'}>
              <Button type='button'>Đăng ký</Button>
            </Link>
            <Link to={'/sign-in'}>
              <Button type='button'>Đăng nhập</Button>
            </Link>
          </>
        )}
      </form>
    </>
  );
};

export default SearchHeader;
