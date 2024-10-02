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

function App() {
  // const dispatch = useDispatch()

  // const { data: users, isLoading, isError, error } = useGetAllUsersQuery()

  // if (isLoading) return <p>Loading...</p>
  // if (isError) return <p>Error: {error.message}</p>

  // dispatch(getUsers(users))

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
