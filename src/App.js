import AdminLayout from 'pages/layout/AdminLayout';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Layout from 'pages/layout/Layout';
import _ from 'lodash'
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { logout, setCurrentUser } from 'redux/actions/AuthActions';
import 'antd/dist/antd.css';

function App() {

  const auth = useSelector((auth) => auth.auth.user);

  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
      if (Date.now() / 1000 > decoded.exp) {
        dispatch(logout());
      }
    }
  }, [dispatch, token]);

  return (
    <div className="App">
      {
        !_.isEmpty(auth) && auth?.sub ? (
          <>
            <AdminLayout />
          </>
        ) : (
          <>
            <Layout />
          </>
        )
      }

    </div>
  );
}

export default App;
