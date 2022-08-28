import React, { useEffect } from 'react';
import ItemDog from '../ItemDog/ItemDog';

const ReceiveDogs = () => {
  useEffect(() => {
    document.title = 'ReceiveDogs | Paradise for pets';
  }, []);
  return (
    <div className='flex flex-wrap items-center justify-center gap-6 pt-10 mx-auto p-7'>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
      <ItemDog></ItemDog>
    </div>
  );
};

export default ReceiveDogs;
