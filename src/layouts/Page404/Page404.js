import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import { IconPage404 } from './../../components/icons/IconPage404';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center p-8 gap-y-6'>
      <div className='flex flex-col items-center justify-center gap-y-6'>
        <span className='text-5xl'>404</span>
        <i className='text-3xl'>
          <IconPage404 />
        </i>
      </div>
      <div className='w-[800px] text-left'>
        <p className='text-xl tracking-wider'>
          Bạn đang truy cập một trang không tồn tại hoặc đã bị xoá/thay thế
          trong hệ thống{' '}
          <Link to={'/'}>
            <strong>Paradise for pets</strong>
          </Link>{' '}
          . Đừng lo, hãy quay về trang chủ hoặc trở lại trang trước đó nhé!
        </p>
        <Link to={'/'}>
          <Button type='button' className='mr-auto mt-7 '>
            Trang chủ
          </Button>
        </Link>
        <Button
          onClick={() => navigate(-1)}
          type='button'
          className='mr-auto text-white bg-transparent border-2 border-blue-500 mt-7 ml-9'
        >
          Quay lại
        </Button>
      </div>
    </div>
  );
};

export default Page404;
