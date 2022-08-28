import React, { useState } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 400) {
      setVisible(true);
    } else if (scrolled <= 400) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);
  return (
    <>
      {visible ? (
        <>
          <button
            className='fixed bg-transparent border-2 border-black rounded-full cursor-pointer right-10 bottom-10'
            onClick={scrollToTop}
          >
            <i>
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
                  d='M7 11l5-5m0 0l5 5m-5-5v12'
                />
              </svg>
            </i>
          </button>
        </>
      ) : null}
    </>
  );
};

export default BackToTop;
