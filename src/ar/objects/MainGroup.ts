import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import { stateStore } from '../storage';
import { PlaneObject } from './PlaneObjet';
// import { TouchableModelModule } from '@hypercloud-kr/webxr-node/dist/modules/touch/TouchableModel';
import { stateStore } from '@/ar/storage';
import { ArManager } from '../ArManager';
import {
  addOrientationEvent,
  removeOrientationEvent,
} from '@/utils/CustomEvent';
let angle;
export class MainGroup extends XrObject {
  grid;
  id;
  touchableModelModule;
  constructor(grid) {
    super();
    this.grid = grid;
    // window.addEventListener("deviceorientation", handleOrientation);
    // const requestPermission = (window.DeviceOrientationEvent as unknown as DeviceOrientationEventiOS)?.requestPermission;
    // if (typeof (DeviceMotionEvent) !== 'undefined' && typeof (requestPermission) === 'function') {
    //   requestPermission().then((response) => {
    //       if (response === 'granted') {
    //           window.addEventListener('devicemotion', handleOrientation)
    //       }
    //   })
    // }

    // window.addEventListener('touchstart', () => {
    //   window.removeEventListener('deviceorientation', handleOrientation);
    //   window.removeEventListener('devicemotion', handleOrientation);
    //   stateStore.setReady();
    //   angle = null;
    // });
    this.modelGroup.visible = false;

    // this.modelGroup.rotation.x = Math.PI / 4;
    // this.touchableModelModule = new TouchableModelModule(this);
    // this.modules.push(this.touchableModelModule);
    // this.touchableModelModule.onTouch = this.onTouch.bind(this);
    // if(stateStore.getState().firstStart) {
    //   this.init(() => {});
    // };
    this.id = 'mainGroup';
  }
  // onTouch(mesh?: THREE.Intersection[]) {
  //   console.log(this.children, this.modelGroup, mesh[0].object);
  // this.children.forEach(child => {
  //   const item = mesh.find(
  //     m => child.nodeId === m.object.parent?.parent?.userData.id
  //   );
  //   if (item) {
  //     child.onTouch();
  //   }
  // });
  // }
  init(callback) {
    this.modelGroup.visible = true;
    addOrientationEvent(handleOrientation);
    window.addEventListener(
      'touchstart',
      () => {
        removeOrientationEvent(handleOrientation);
        this.initAfterTouch();
        callback();
        ArManager.setReady();
      },
      { once: true }
    );
  }
  initAfterTouch() {
    stateStore.setReady();
    angle = null;
    this.modelGroup.visible = true;
    this.removeChild(this.grid);
    const plane = new PlaneObject();
    this.appendChild(plane);
  }

  finishChildAnimation() {
    //render -> child에서 runAnimation에서 trigger
  }
  runChildAnimation() {
    const delayArr = [0.1, 0.2, 0.3, 0.4, 0.5].sort(() => Math.random() - 0.5);
    let i = 0;
    this.children.forEach(child => {
      if (child.runAnimation) {
        child.isFinishAnimation = false;
        setTimeout(() => {
          i++;
          child.runAnimation();
        }, delayArr[i] * 1000);
      }
    });
  }
  update() {
    super.update();
    // this.modules.forEach(module => module.update());
    if (angle !== null) {
      if (window.innerWidth < 1280) {
        const pos = this.parent.camera.position;
        const cameraDirection = new THREE.Vector3();
        this.parent.camera.getWorldDirection(cameraDirection);
        this.modelGroup.position.set(
          pos.x + cameraDirection.x * angle,
          pos.y + cameraDirection.y * angle,
          pos.z + cameraDirection.z * angle
        );
        this.modelGroup.lookAt(pos);
        this.modelGroup.rotateX(Math.PI / 6);
      } else {
        this.modelGroup.position.set(0, 1, 0);
      }
    }
  }

  render(): void {
    super.render();
    // this.modules.forEach(module => module.render());
    let finishedAnimation = 0;
    this.children.forEach(child => {
      if (child.isFinishAnimation) {
        finishedAnimation++;
        if (finishedAnimation === 5) {
          this.runChildAnimation();
        }
      }
    });
  }
}

const handleOrientation = event => {
  const { beta } = event;
  if (angle !== null) {
    angle = beta - 50; //-(beta - 90);
  }
  // let div;
  // if (!document.getElementById('test')) {
  //   div = document.createElement('div');
  //   document.body.appendChild(div);
  // } else {
  //   div = document.getElementById('test');
  // }
  // div.id = 'test';
  // div.innerHTML = `absolute: ${absolute}, alpha: ${alpha}, beta: ${beta}, gamma: ${gamma}`;
  // div.style.cssText =
  //   'position: fixed; top: 30px; left: 0; z-index: 1000; background-color0padding: 10px;';

  // const pos = this.parent.camera.position;
  // const cameraDirection = new THREE.Vector3();
  // this.parent.camera.getWorldDirection(cameraDirection);
  // this.mainScene.children[0].modelGroup.position.set(pos.x + cameraDirection.x * 2, pos.y + cameraDirection.y * 2, pos.z + cameraDirection.z * 2);
  // this.mainScene.children[0].modelGroup.lookAt(pos);
  // this.mainScene.children[0].modelGroup.position.z = +beta - 90;
};
