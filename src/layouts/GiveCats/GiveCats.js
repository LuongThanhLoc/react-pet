import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/auth-contexts';
import { Link } from 'react-router-dom';

const GiveCats = () => {
  useEffect(() => {
    document.title = 'GiveCats | Paradise for pets';
  }, []);
  const { userInfo } = useAuth();
  return (
    <>
      {userInfo ? (
        <>
          <div>give cats</div>
        </>
      ) : (
        <>
          <div className='flex flex-col items-center justify-center mx-auto mt-14 gap-y-6'>
            <p className='text-3xl font-semibold'>
              Chức năng này chỉ khả dụng khi bạn đã đăng nhập!
            </p>
            <div className='text-xl'>
              <span>
                <Link className='mr-2 text-blue-500 ' to={'/sign-in'}>
                  Đăng nhập
                </Link>{' '}
                tại đây nhé
              </span>

              <p className='mt-5'>
                Nếu bạn chưa có tài khoản hãy
                <Link className='mx-2 text-blue-500' to={'/sign-up'}>
                  Đăng ký
                </Link>{' '}
                1 tài khoản nhé
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GiveCats;
