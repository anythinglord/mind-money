import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RedirectRoute from './RedirectRoute';
import { LandingPage, HomePage, LoginPage, ExpensesPage } from '../pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RedirectRoute />} >
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="/" element={<PrivateRoute />} >
        <Route path="home" element={<HomePage />} />
        <Route path="expenses" element={<ExpensesPage />} />
      </Route>
    </Routes>
  );
}