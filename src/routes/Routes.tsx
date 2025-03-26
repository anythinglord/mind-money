import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/Home';
import LoginPage from '../pages/Login/Login';
import PrivateRoute from './PrivateRoute';
import RedirectRoute from './RedirectRoute';
import { Landing } from '../pages';
import { ExpensesPage } from '../pages/Expenses/Expenses';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RedirectRoute />} >
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<Landing />} />
      </Route>
      <Route path="/" element={<PrivateRoute />} >
        <Route path="home" element={<HomePage />} />
        <Route path="expenses" element={<ExpensesPage />} />
      </Route>
    </Routes>
  );
}