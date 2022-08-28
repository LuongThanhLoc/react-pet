import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import IconPageInfo from '../../components/icons/IconPageInfo';

const InfoCatsAndDogs = () => {
  useEffect(() => {
    document.title = 'InfoCatsAndDogs | Paradise for pets';
  }, []);
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center mx-auto mt-10 w-fit gap-y-6'>
      <i>
        <IconPageInfo></IconPageInfo>
      </i>
      <p className='text-3xl'>
        {' '}
        Hiện tại trang đang xây dựng mọi người quay lại sau nhé
      </p>
      <div className='flex gap-x-3'>
        <Link to={'/'}>
          <Button type='button' className='mr-auto mt-7'>
            Trang Chủ
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

export default InfoCatsAndDogs;
