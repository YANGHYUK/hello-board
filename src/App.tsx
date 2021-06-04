import React, { LazyExoticComponent, Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { tokenRefreshRequest, HooksLogin } from 'src/store/login/loginSlice';
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
  useEffect(() => {
    if (!isLogin) {
      dispatch(
        tokenRefreshRequest({
          method: 'post',
          api: 'tokenRefresh',
          data: { refresh: localStorage.getItem('refresh') },
        }),
      );
    }
  }, [isLogin]);

  return (
    <div className="App">
      <Suspense fallback={<div>...loading...</div>}>
        <BrowserRouter>
          <Switch>
            {Routes.map((info: IRouteProps) => (
              <Route {...info} key={`${info.path}`} />
            ))}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
