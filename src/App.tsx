import { lazy, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AboutPage } from '@/pages';
import { MobileLayout } from '@/components';
import StartingPage from './components/ui/StartingPage';
import PrecautionsComponent from './components/ui/PrecautionComponent';
import {
  FunnelAttributionType,
  SolutionFunnel,
  stackFunnel,
} from './util/funnel';
import { getDeviceId } from './util/util';
import { getEnvInfo } from './ar/constants/apiConstants';

const ArPage = lazy(() => import('@pages/ar.tsx'));

const router = createBrowserRouter([
  {
    element: <MobileLayout />,
    children: [
      {
        path: '/',
        element: <StartingPage />,
      },
      {
        path: '/precautions',
        element: <PrecautionsComponent />,
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
  useEffect(() => {
    SolutionFunnel.init({
      deviceId: getDeviceId(),
      appKey: getEnvInfo().appKey,
      campaignId: getEnvInfo().campaignId,
    });
    stackFunnel(FunnelAttributionType.SCENE_START);
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
