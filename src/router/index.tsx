import { createBrowserRouter, Navigate, createHashRouter } from 'react-router-dom';
import Layout from '@/components/layout';
import Home from '@/pages/home';
import About from '@/pages/about';
import Dashboard from '@/pages/dashboard';
import ApiTest from '@/pages/apitest';
import LoginPage from '../pages/login';
import Test from '@/pages/test';
import Chart from '../pages/chart';
import ProductPage from '../pages/shop';
import NotFound from '@/pages/notfound';
import Organization from '@/pages/organization';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Navigate to="/home" replace />,
//       },
//       {
//         path: 'home',
//         element: <Home />,
//       },
//       {
//         path: 'about',
//         element: <About />,
//       },
//       {
//         path: 'dashboard',
//         element: <Dashboard />,
//       },
//       {
//         path: 'apitest',
//         element: <ApiTest />,
//       },
//       {
//         path: 'test',
//         element: <Test />,
//       },
//       {
//         path: 'chart',
//         element: <Chart />,
//       },
//       {
//         path: 'shop',
//         element: <ProductPage />
//       },
//       {
//         path: 'organization',
//         element: <Organization />
//       }
//     ],
//   },
//   {
//     path: 'login',
//     element: <LoginPage />,
//   },
//   {
//     path: '*',
//     element: <NotFound />,
//   }
// ]);
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'apitest',
        element: <ApiTest />,
      },
      {
        path: 'test',
        element: <Test />,
      },
      {
        path: 'chart',
        element: <Chart />,
      },
      {
        path: 'shop',
        element: <ProductPage />
      },
      {
        path: 'organization',
        element: <Organization />
      }
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

export default router;