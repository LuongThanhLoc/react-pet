// import { addDoc, collection, getDocs } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import { db } from './firebase/config';

// const App = () => {
//   // colRef
//   const colRef = collection(db, 'learn');
//   const [title, setTitle] = useState('');
//   useEffect(() => {
//     const arr = [];
//     getDocs(colRef)
//       .then((snapshots) => {
//         snapshots.forEach((item) => {
//           arr.push({
//             title: item.title,
//             ...item.data(),
//           });
//         });
//         // console.log(arr);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addDoc(colRef, {
//       title,
//     })
//       .then(() => console.log('success'))
//       .catch((err) => console.log(err));
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type='text'
//           className='border border-blue-400 '
//           name='title'
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <button type='submit'>Add </button>
//       </form>
//     </>
//   );
// };

// export default App;
