import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { userAuthInfo, userToken } from 'src/redux/user/reducer';
import { ProtectedRoute } from 'src/routes/protected';
import LoginPage from './pages/guests/login';
import HomePage from 'src/pages/homepage';
import SummaryPage from 'src/pages/summarypage';
import PendingTransaction from 'src/pages/homepage/pending';
import AllTransaction from 'src/pages/homepage/allTransactions';

function App() {
  const user = useSelector(userAuthInfo);
  const token = useSelector(userToken);

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              user ? (
                <Navigate to='/pending-transaction/:tab' />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route path='/' element={<ProtectedRoute />}>
            {user && user.role === 'Admin' ? (
              <Route index element={<Navigate to='/all-transactions'/>} />
            ) : (
              <Route index element={<HomePage />} />
            )}
            <Route path='/all-transactions' element={null}>
              <Route index element={<AllTransaction />} />
            </Route>
            <Route path='/pending-transaction' element={null}>
              {/* Route for the tab parameter */}
              <Route index element={<Navigate to='receiver' />} />
              <Route path=':tab' element={<HomePage />} />
              {/* Route for receiving */}
              <Route
                path='receiver/:id'
                element={<SummaryPage type='receiver' />}
              />
              {/* Route for scaling */}
              <Route
                path='scaler/:id'
                element={<SummaryPage type='scaler' />}
              />
            </Route>
            {/* Route for AllTransactions */}
          </Route>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
