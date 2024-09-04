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
      this.modelGroup.position.x - 8,
      this.modelGroup.position.y + 9,
      this.modelGroup.position.z + 12
    );
  }

  initialize() {
    angle = undefined;
  }

  moveModel() {
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
  }

  finishChildAnimation() {
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
  runChildAnimation() {
    const delayArr = [0.1, 0.2, 0.3, 0.4, 0.5].sort(() => Math.random() - 0.5);
    let i = 0;
    this.children.forEach(child => {
      if (child.runAnimation) {
        child.isFinishAnimation = false;
        // setTimeout(() => {
        child.runAnimation(delayArr[i]);
        i++;
        // }, delayArr[i] * 1000);
      }
    });
  }

  update() {
    super.update();
    // this.modules.forEach(module => module.update());
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
    // this.modules.forEach(module => module.render());
    // let finishedAnimation = 0;
    // this.children.forEach(child => {
    //   if (child.isFinishAnimation) {
    //     finishedAnimation++;
    //     if (finishedAnimation === 5) {
    //       this.runChildAnimation();
    //     }
    //   }
    // });
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
