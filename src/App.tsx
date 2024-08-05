import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AboutPage } from '@/pages';
import { MobileLayout } from '@/components';
const ArPage = lazy(() => import('@pages/ar.tsx'));

const router = createBrowserRouter([
  {
    element: <MobileLayout />,
    children: [
      {
        path: '/',
        element: <ArPage />,
      },
      {
        path: '/ar',
        element: <ArPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
