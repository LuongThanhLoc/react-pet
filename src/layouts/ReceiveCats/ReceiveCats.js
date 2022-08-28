import React, { useEffect } from 'react';

const ReceiveCats = () => {
  useEffect(() => {
    document.title = 'ReceiveCats | Paradise for pets';
  }, []);
  return <div>ReceiveCats</div>;
};

export default ReceiveCats;
