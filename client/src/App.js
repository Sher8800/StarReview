import './App.css';
import AuthorizationPage from './pages/AuthorizationPage';
import RegistrationPage from './pages/RegistrationPage';
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage';
import { useDispatch } from 'react-redux';
import { useGetAllCommentsQuery, useGetAllUsersQuery } from './api/api';
import { getUsers } from './redux/slices/usersSlice';
import AllUsersPage from './pages/AllUsersPage';
import UserPage from './pages/UserPage';
import { useEffect } from 'react';
import { setComments } from './redux/slices/commentsSlice';

function App() {

  const dispatch = useDispatch();

  const { data: allUsers, error: usersError, isSuccess: isSuccessAllUsers } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: allComments, error: commentsError, isSuccess: isSuccessAllComments } = useGetAllCommentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (usersError) {
      console.error('Error loading users', usersError);
    }

    if (commentsError) {
      console.error('Error loading comments', commentsError);
    }

    if (isSuccessAllUsers && allUsers && allUsers.length > 0) {
      dispatch(getUsers(allUsers));
    }

    if (isSuccessAllComments && allComments && allComments.length > 0) {
      dispatch(setComments(allComments));
    }
  }, [allUsers, allComments, usersError, commentsError, dispatch]);

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
