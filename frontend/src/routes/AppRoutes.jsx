import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import LegalPage from '../pages/LegalPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/catalog"
        element={
          <MainLayout>
            <CatalogPage />
          </MainLayout>
        }
      />
      {['privacy', 'terms', 'cookies', 'warranty'].map((type) => (
        <Route
          key={type}
          path={`/${type}`}
          element={
            <MainLayout showNewsletter={false}>
              <LegalPage type={type} />
            </MainLayout>
          }
        />
      ))}
      <Route
        path="*"
        element={
          <MainLayout showNewsletter={false}>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
