import React, { LazyExoticComponent, Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { tokenRefreshRequest, HooksLogin } from 'src/store/login/loginSlice';
import { getCookie } from 'src/lib/cookieFunction';
import Routes from './pages';
interface IRouteProps {
  component: LazyExoticComponent<(props: any) => JSX.Element>;
  title: string;
  path: string;
  layout: boolean;
  exact: boolean;
}

function App() {
  const dispatch = useDispatch();
  const { isLogin } = HooksLogin();
  const history = useHistory();
  useEffect(() => {
    if (!isLogin) {
      if (localStorage.getItem('refresh')) {
        dispatch(
          tokenRefreshRequest({
            method: 'post',
            api: 'tokenRefresh',
            data: { refresh: localStorage.getItem('refresh') },
          }),
        );
      } else {
        history.replace('/login');
      }
    }
  }, [isLogin]);

  return (
    <div className="App">
      <Suspense fallback={<div>...loading...</div>}>
        <Switch>
          {Routes.map((info: IRouteProps) => (
            <Route {...info} key={`${info.path}`} />
          ))}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
