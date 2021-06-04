import React, { lazy } from 'react';

const Signup = lazy(() => import('./Signup'));
const Login = lazy(() => import('./Login'));
const Board = lazy(() => import('./Board'));
const Routes = [
  { title: 'board', path: '/', exact: true, component: Board, layout: true },
  {
    title: 'board',
    path: '/board',
    exact: false,
    component: Board,
    layout: true,
  },

  {
    title: 'signup',
    path: '/signup',
    exact: true,
    component: Signup,
    layout: true,
  },

  {
    title: 'login',
    path: '/login',
    exact: true,
    component: Login,
    layout: true,
  },
];

export default Routes;
