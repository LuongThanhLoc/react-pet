import React from 'react';
import { Link } from 'react-router-dom';
import { publicRoute } from '../../routes';
import SearchHeader from '../SearchHeader/SearchHeader';

const Header = () => {
  return (
    <>
      <div>
        <SearchHeader></SearchHeader>
        <header className='w-full bg-primaryColor'>
          <ul className='w-full flex justify-center items-center gap-x-6  p-[12px] font-semibold'>
            {publicRoute.map((item) => {
              return (
                <li className='flex items-center gap-x-1 ' key={item.id}>
                  {item.logo}
                  <Link
                    to={`${item.path}`}
                    className='uppercase cursor-pointer '
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </header>
      </div>
    </>
  );
};

export default Header;
