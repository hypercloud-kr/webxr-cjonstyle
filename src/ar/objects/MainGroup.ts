import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import { PlaneObject } from './PlaneObjet';
// import { TouchableModelModule } from '@hypercloud-kr/webxr-node/dist/modules/touch/TouchableModel';
import { stateStore } from '@/ar/storage';
import {
  addOrientationEvent,
  removeOrientationEvent,
} from '@/utils/CustomEvent';
import { addLight } from '@/utils/threeUtil';
import { PlaneGrid } from '../objects/PlaneGrid';
import { ArManager } from '../ArManager';
import * as THREE from 'three';
import { MainObject } from './MainObject';

let angle: number | null | undefined;
export class MainGroup extends XrObject {
  grid;
  id;
  constructor() {
    super();
    this.grid = new PlaneGrid();
    this.grid.position.set(0, -1, 0);
    this.appendChild(this.grid);
    this.modelGroup.visible = false;
    this.modelGroup.userData.id = undefined;
    this.id = 'mainGroup';
  }
  init(callback: () => void) {
    this.modelGroup.visible = true;
    addOrientationEvent(handleOrientation);
    window.addEventListener(
      'touchstart',
      () => {
        removeOrientationEvent(handleOrientation);
        this.initAfterTouch();
        callback();
      },
      { once: true }
    );
  }
  initAfterTouch() {
    stateStore.setReady(true);
    angle = null;
    this.modelGroup.visible = true;
    this.removeChild(this.grid);
    const plane = new PlaneObject();
    this.appendChild(plane);

    const light = addLight(this.modelGroup);
    light.target.position.copy(this.modelGroup.position);
    light.position.set(
      this.modelGroup.position.x - 4,
      this.modelGroup.position.y + 8,
      this.modelGroup.position.z + 12
    );
  }

  initialize() {
    angle = undefined;
  }

  moveModel() {
    const camera = ArManager.instance.xr8Camera;
    const pos = camera.position;
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    this.modelGroup.position.set(
      pos.x + cameraDirection.x * angle!,
      pos.y + cameraDirection.y * angle!,
      pos.z + cameraDirection.z * angle!
    );
    this.modelGroup.lookAt(pos);
    this.modelGroup.rotateX(Math.PI / 6);
  }

  finishChildAnimation() {
    let finishedAnimation = 0;
    this.children.forEach(child => {
      if ((child as any).isFinishAnimation) {
        finishedAnimation++;
        if (finishedAnimation === 5) {
          this.runChildAnimation();
        }
      }
    });
  }
  runChildAnimation() {
    const delayArr = [0.1, 0.2, 0.3, 0.4, 0.5].sort(() => Math.random() - 0.5);
    let i = 0;
    this.children.forEach((child: any) => {
      if (child.runAnimation) {
        child.isFinishAnimation = false;
        child.runAnimation(delayArr[i]);
        i++;
      }
    });
  }
  repositionChildObjects() {
    this.children.forEach((child: MainObject, i) => {
      if (i >= 5) return;
      child.isOpen = true;
      child.modelGroup.position.set(
        stateStore.getState().position[i][0],
        stateStore.getState().position[i][1],
        stateStore.getState().position[i][2]
      );
      child.modelMixer?.stopAllAction();
      child.openAnimationObject.stopAnimation();

      child.animate(`${child.item.aniName}`);
      child.openAnimationObject.position.copy(child.position);
      child.openAnimationObject.openAnimation().then(() => {
        child.afterOpenAnimation();
      });
    });
  }
  update() {
    super.update();
    if (angle !== null) {
      if (window.innerWidth < 1280) {
        this.moveModel();
      } else {
        this.modelGroup.position.set(0, 1, 0);
      }
    }
  }

  render(): void {
    super.render();
  }
}

const handleOrientation = (event: DeviceOrientationEvent) => {
  const { beta } = event;
  if (angle !== null) {
    angle = (beta as number) - 40; //-(beta - 90);
  }
};
