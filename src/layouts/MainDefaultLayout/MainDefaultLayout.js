import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Page404 from '../Page404/Page404';
import { publicRoute } from '../../routes';
import Header from '../Header/Header';
import BackToTop from '../../components/backToTop/BackToTop';

const MainDefaultLayout = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        {publicRoute.map((route) => {
          const Page = route.element;
          return (
            <Route
              key={route.id}
              path={route.path}
              element={<Page></Page>}
            ></Route>
          );
        })}
        <Route path='*' element={<Page404></Page404>}></Route>
      </Routes>
      <BackToTop></BackToTop>
    </>
  );
};

export default MainDefaultLayout;
