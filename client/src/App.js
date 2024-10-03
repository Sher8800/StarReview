import './App.css';
import AuthorizationPage from './pages/AuthorizationPage';
import RegistrationPage from './pages/RegistrationPage';
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage';
import { useDispatch } from 'react-redux';
import { useGetAllUsersQuery } from './api/api';
import { getUsers } from './redux/slices/usersSlice';
import AllUsersPage from './pages/AllUsersPage';
import UserPage from './pages/UserPage';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch()
  const { data } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (data) {
      dispatch(getUsers(data))
    }
  }, [data, dispatch])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route index element={<HomePage />} />
          <Route path='allUsers' element={<AllUsersPage />} />
          <Route path='user/:id' element={<UserPage />} />
        </Route>
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='authorization' element={<AuthorizationPage />} />
      </Routes>
    </div>
  );
}

export default App;
