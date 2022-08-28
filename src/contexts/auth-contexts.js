import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const { createContext, useContext, useState, useEffect } = require('react');

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const values = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
      //   if (user) {
      //     const docRef = query(
      //       collection(db, 'users'),
      //       where('email', '==', user.email)
      //     );
      //     onSnapshot(docRef, (snapshot) => {
      //       snapshot.forEach((doc) => {
      //         setUserInfo({
      //           ...user,
      //           ...doc.data(),
      //         });
      //       });
      //     });
      //     // setUserInfo(user);
      //   } else {
      //     setUserInfo(null);
      //   }
    });
  }, []);
  return (
    <AuthContext.Provider {...props} value={values}></AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === 'undefined') throw Error('error with useAuth');
  return context;
}

export { AuthProvider, useAuth };
