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
  ready;
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
    if (!config.isFirstStart) {
      this.initGroup(config.setIsOpenGuide2);
      // const mainGroup = this.instance.mainScene.children[0];
      // mainGroup.initAfterTouch();
      // this.setReady();
    }
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

  static initGroup(setIsOpenGuide2?) {
    const mainGroup = this.instance.mainScene.children.find(
      item => item.id === 'mainGroup'
    );

    const callback = () => {
      if (setIsOpenGuide2) setIsOpenGuide2(false);
      ArManager.setReady();
    };
    mainGroup.init(callback);
  }

  static setReady() {
    this.instance.ready = true;
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
    this.mainGroup = this.mainScene.children[0];
    // window.addEventListener("deviceorientation", this.mainGroup.handleOrientation, true);
    // const requestPermission = (window.DeviceOrientationEvent as unknown as DeviceOrientationEventiOS)?.requestPermission;
    // if (typeof (DeviceMotionEvent) !== 'undefined' && typeof (requestPermission) === 'function') {
    //   requestPermission().then((response) => {
    //       if (response === 'granted') {
    //           window.addEventListener('devicemotion', this.mainGroup.handleOrientation)
    //       }
    //   })
    // }
  }
  handleOrientation = event => {
    const { absolute, alpha, beta, gamma } = event;
    let div;
    if (!document.getElementById('test')) {
      div = document.createElement('div');
    } else {
      div = document.getElementById('test');
    }
    div.id = 'test';
    div.innerHTML = `absolute: ${absolute}, alpha: ${alpha}, beta: ${beta}, gamma: ${gamma}`;
    div.style.cssText =
      'position: fixed; top: 30px; left: 0; z-index: 1000; background-color0padding: 10px;';
    document.body.appendChild(div);

    // const pos = this.parent.camera.position;
    // const cameraDirection = new THREE.Vector3();
    // this.parent.camera.getWorldDirection(cameraDirection);
    // this.mainScene.children[0].modelGroup.position.set(pos.x + cameraDirection.x * 2, pos.y + cameraDirection.y * 2, pos.z + cameraDirection.z * 2);
    // this.mainScene.children[0].modelGroup.lookAt(pos);
    // this.mainScene.children[0].modelGroup.position.z = +beta - 90;
  };
  release() {
    const mainGroup = this.mainScene.children.find(
      item => item.id === 'mainGroup'
    );
    mainGroup.initialize();
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
