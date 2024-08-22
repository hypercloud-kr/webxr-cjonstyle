import { touchManager } from '@hypercloud-kr/webxr-node/dist/modules/touch/TouchManager';
import * as THREE from 'three';

export const addTouchEvent = (scene: any) => {
  touchManager.setScene(scene);
  window.addEventListener('click', touch);
  window.addEventListener('touchstart', touch);
};

export const removeTouchEvent = () => {
  window.removeEventListener('click', touch);
  window.removeEventListener('touchstart', touch);
};

export const touch = (event: any) => {
  const x = event.clientX ? event.clientX : event.touches[0].clientX;
  const y = event.clientY ? event.clientY : event.touches[0].clientY;

  // 상황에 따라 window를 canvas로 변경 가능 (로직 수정 필요)
  const width = window.innerWidth;
  const height = window.innerHeight;
  const pointer = new THREE.Vector2();
  pointer.x = (x / width) * 2 - 1;
  pointer.y = -(y / height) * 2 + 1;
  touchManager.touch(pointer);
};
