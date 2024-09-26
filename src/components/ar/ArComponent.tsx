import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { XR8_MODE } from '@/ar/config';
import { ArManager } from '@/ar/ArManager';
import { load8ThWall } from '@/ar/XR8';
import useDeviceAlertManager from '../ui/useDeviceAlertManager';
import GuideComponent from '../ui/GuideComponent';
import Guide2Component from '../ui/Guide2Component';
import { stateStore } from '@/ar/storage';

declare global {
  interface Window {
    XR8: unknown;
  }
}

function ArComponent() {
  const [isOpenGuide, setIsOpenGuide] = useState(
    stateStore.getState().firstStart
  );
  const [isOpenGuide2, setIsOpenGuide2] = useState(
    !stateStore.getState().firstStart
  );
  const [isShowingGuide, setIsShowingGuide] = useState(false);
  useEffect(() => {
    const canvas = document.getElementById('arCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const loadXr = () => {
      load8ThWall(canvas, stateStore.getState().firstStart, setIsOpenGuide2);
      setIsShowingGuide(true);
    };
    if (XR8_MODE) {
      window.XR8 ? loadXr() : window.addEventListener('xrloaded', loadXr);
    } else {
      ArManager.init({ canvas });
    }
    return () => {
      if (ArManager.initialized) ArManager.instance.release();
      if (XR8) {
        XR8.stop();
        XR8.clearCameraPipelineModules();
      }
    };
  }, []);
  useDeviceAlertManager();
  // console.log('ArComponent');

  return (
    <>
      <StyledCanvas id={'arCanvas'} />
      {isShowingGuide && isOpenGuide && (
        <GuideComponent
          setIsOpenGuide={setIsOpenGuide}
          setIsOpenGuide2={setIsOpenGuide2}
        />
      )}
      {isOpenGuide2 && <Guide2Component />}
    </>
  );
}

export default ArComponent;

const StyledCanvas = styled.canvas`
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  pointer-events: none;
`;
