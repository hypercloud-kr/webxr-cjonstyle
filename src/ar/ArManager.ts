import { XR8_MODE } from '@/ar/config.ts';
import { IAnimate } from '@hypercloud-kr/webxr-node/dist/animate';
import { MainScene } from '@/ar/MainScene';
import * as THREE from 'three';
import { XrSceneConfig } from '@hypercloud-kr/webxr-node/dist/XrScene.ts';
import { addTouchEvent, removeTouchEvent } from './touch/touch';

const clock = new THREE.Clock();
export let deltaTime = 0;
export function updateDeltaTime() {
  deltaTime = clock.getDelta();
}

export class ArManager implements IAnimate {
  static _instance: ArManager;
  static get initialized() {
    return !!this._instance;
  }
  static initCallbacks: (() => void)[] = [];

  static get instance() {
    if (!this.initialized) {
      throw new Error('ArManager is not initialized');
    }
    return this._instance;
  }

  static onInit(callback: () => void) {
    if (this.initialized) {
      callback();
    } else {
      this.initCallbacks.push(callback);
    }
  }

  static init(config: XrSceneConfig) {
    if (this.initialized) {
      console.error('ArManager is already initialized');
      return;
    }
    this._instance = new ArManager(config);
    // Solve InitCallback
    this.initCallbacks.forEach(callback => callback());
    this.initCallbacks = [];
    // 8ThWall은 8ThWall Init 부분에서 처리
    if (!XR8_MODE) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const animate = (config: IAnimate) => (time: number) => {
        updateDeltaTime();
        config.render();
        config.update();
        requestAnimationFrame(animate(config));
      };
      animate(this.instance)(1);
    }
  }

  static initialize() {
    this._instance = undefined;
  }
  // Static Method End

  // 여러개의 Scene을 관리할 수 있도록
  // private Scene1: Scene1;
  // private Scene2: Scene2;
  public mainScene: MainScene;
  // 8ThWall에서 Slam용으로 사용할 카메라 return
  public get xr8Camera() {
    return this.mainScene.camera;
  }
  constructor(config: XrSceneConfig) {
    this.mainScene = new MainScene(config);
    // this.Scene1 = new Scene1(canvas);
    // this.Scene2 = new Scene2(canvas);
    addTouchEvent(this.mainScene);
  }
  release() {
    this.mainScene.release();
    removeTouchEvent();
    ArManager.initialize();
  }
  update() {
    this.mainScene.update();
    // this.Scene1.update();
    // this.Scene2.update();
  }

  render() {
    this.mainScene.render();
    // this.Scene1.render();
    // this.Scene2.render();
  }
}
