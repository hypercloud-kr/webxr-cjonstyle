import styled from '@emotion/styled';
import { useEffect } from 'react';
import { XR8_MODE } from '@/ar/config';
import { ArManager } from '@/ar/ArManager';
import { load8ThWall } from '@/ar/XR8';

declare global {
  interface Window {
    XR8: unknown;
  }
}

function ArComponent() {
  useEffect(() => {
    const canvas = document.getElementById('arCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const loadXr = () => {
      load8ThWall(canvas);
    };
    if (XR8_MODE) {
      window.XR8 ? loadXr() : window.addEventListener('xrloaded', loadXr);
    } else {
      ArManager.init({ canvas });
    }
    return () => {
      if (ArManager.initialized) ArManager.instance.release();
    };
  }, []);

  // console.log('ArComponent');

  return <StyledCanvas id={'arCanvas'} />;
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
