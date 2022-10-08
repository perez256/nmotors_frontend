import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// components
import LoadingScreen from './components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/beneficiary/home" replace />, index: true },
        { path: '/beneficiary/home', element: <Home /> },
        { path: 'beneficiary/plans', element: <Plans /> },
        { path: 'beneficiary/account', element: <Account /> },
        { path: 'beneficiary/history', element: <History /> },
        { path: 'beneficiary/paydetails/:id', element: <PayDetail /> },
        { path: 'beneficiary/receipt/:id', element: <Receipt /> },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: 'login', element: <Login /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// perez urls
const Login = Loadable(lazy(() => import('./BACK_PAGES/auth/Login')));
const NotFound = Loadable(lazy(() => import('./BACK_PAGES/404/Page404')));
const Home = Loadable(lazy(() => import('./BACK_PAGES/pages/Home')));
const Plans = Loadable(lazy(() => import('./BACK_PAGES/pages/Plans')));
const Account = Loadable(lazy(() => import('./BACK_PAGES/pages/Account')));
const History = Loadable(lazy(() => import('./BACK_PAGES/pages/History')));
const PayDetail = Loadable(lazy(() => import('./BACK_PAGES/pages/PayDetail')));
const Receipt = Loadable(lazy(() => import('./BACK_PAGES/pages/Receipt')));