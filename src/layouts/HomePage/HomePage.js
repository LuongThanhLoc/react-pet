import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    document.title = 'HomePage | Paradise for pets';
  }, []);
  return <div>Home Page</div>;
};

export default HomePage;
