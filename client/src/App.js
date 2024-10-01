import './App.css';
import AuthorizationPage from './pages/AuthorizationPage';
import RegistrationPage from './pages/RegistrationPage';
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='authorization' element={<AuthorizationPage />} />
        {/* <Route path='*' element={<Navigate to='/authorization' />} /> */}
      </Routes>
    </div>
  );
}

export default App;
