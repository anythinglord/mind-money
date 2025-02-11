import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import RedirectRoute from './RedirectRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RedirectRoute />} >
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage/>} />
      </Route>
      <Route path="/" element={<PrivateRoute />} >
        <Route path="home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}