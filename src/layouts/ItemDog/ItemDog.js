import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';

const ItemDog = () => {
  return (
    <div className='max-w-[350px] mb-7 border-2 border-gray-200 p-2 '>
      <img
        className='w-full'
        src='https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        alt=''
      />
      <div className='flex items-center justify-between w-full py-1'>
        <div className='flex flex-col mt-3'>
          <span>Con mèo</span>
          <span>Địa chỉ nhận: Bình Dương</span>
        </div>
        <Link to={'/receive-dogs/:'}>
          <Button className='text-black !bg-transparent border-2 border-gray-300 hover:!bg-[#0fb9b1] hover:!text-white transition-all'>
            Xem thông tin
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ItemDog;
