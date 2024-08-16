import LoadingPanel from '@/components/ui/LoadingPanel';
import StartingPage from '@/components/ui/StartingPage.tsx';
import { SuccessComponent } from '@/components/ui/SuccessComponent';
import ArComponent from '@components/ar/ArComponent.tsx';
import { useSyncExternalStore } from 'react';
import { stateStore } from '@/ar/storage';
import ArUiComponent from '@/components/ar/ArUiComponent';

function ArPage() {
  const state = useSyncExternalStore(stateStore.subscribe, stateStore.getState);
  return (
    <>
      {state.gameState === 'start' && <StartingPage />}
      {state.gameState === 'running' && (
        <>
          {<ArComponent />}
          {!state.isModelLoaded && <LoadingPanel />}
          {state.isModelLoaded && <ArUiComponent />}
        </>
      )}
      {state.gameState === 'end' && <SuccessComponent />}
    </>
  );
}

export default ArPage;
