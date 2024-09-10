import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { deltaTime } from '@/ar/ArManager.ts';
import * as THREE from 'three';
import { TouchableModelModule } from '@hypercloud-kr/webxr-node/dist/modules/touch/TouchableModel';
import { stateStore } from '@/ar/storage';
import { OpenAnimation } from './animations/OpenAnimation';
import { CorrectAnimation } from './animations/CorrectAnimation';
import { WrongAnimation } from './animations/WrongAnimation';
import { objectArr } from '../constants/constants';
export class MainObject extends XrObject {
  touchableModelModule;
  item;
  openAnimationObject;
  correctAnimationObject;
  wrongAnimationObject;
  isFinishAnimation = false;
  isOpen = true;
  constructor(item: (typeof objectArr)[any]) {
    super();
    this.item = item;
    ResourceManager.instance
      .loadGLTF(item.url)
      .then(this.onLoadModel.bind(this));

    this.openAnimationObject = new OpenAnimation();
    this.openAnimationObject.position.copy(this.position);
    // this.appendChild(this.openAnimationObject);

    this.correctAnimationObject = new CorrectAnimation();
    this.correctAnimationObject.position.copy(this.position);
    this.appendChild(this.correctAnimationObject);

    this.wrongAnimationObject = new WrongAnimation();
    this.wrongAnimationObject.position.copy(this.position);
    this.appendChild(this.wrongAnimationObject);
  }

  protected onLoadModelFinished() {
    // 모델 로드 완료 후 처리
    this.modelGroup.traverse((item: THREE.Mesh) => {
      if (item.isMesh) {
        item.castShadow = true;
        item.receiveShadow = true;
        if (item.material.name === 'box_tex_Base_color.004') {
          item.material.map.anisotropy =
            this.parent.parent.renderer.capabilities.getMaxAnisotropy();
        }
      }
    });
    this.setAnimation({
      mode: THREE.LoopRepeat,
      timeScale: 1,
    });
    this.animate('box_1');
    stateStore.setModelLoaded();
  }

  public runAnimationOpen() {
    this.touchableModelModule = new TouchableModelModule(this);
    this.modules.push(this.touchableModelModule);
    this.touchableModelModule.onTouch = this.onTouch.bind(this);

    const action = this.animationsMap.get('box_1');
    action?.stop();
    this.setAnimation({
      mode: THREE.LoopOnce,
      repitition: 1,
      timeScale: 2,
    });
    this.animate(`${this.item.aniName}`);
    this.openAnimationObject.openAnimation().then(() => {
      this.afterOpenAnimation();
    });
  }

  // public runAnimation() {
  //   const action = this.animationsMap.get(this.item.aniName);
  //   // action?.stop();
  //   // action?.play();
  //   if (action) {
  //     // action.time = 0;
  //     // action.clampWhenFinished = true;
  //     // action.setLoop(THREE.LoopOnce, 1);
  //   }
  //   // const delayArr = [0.1, 0.2, 0.3, 0.4, 0.5].sort(() => Math.random() - 0.5);
  //   // const delay = Math.random() * 0.5;
  //   // setTimeout(() => {
  //   action?.reset();
  //   this.animate(this.item.aniName).then(() => {
  //     this.isFinishAnimation = true;
  //     // this.openAnimationObject.stopAnimation();
  //     this.parent.finishChildAnimation();
  //   });
  //   this.openAnimationObject.runAnimation();
  //   // }, delay * 1000);
  // }

  onTouch() {
    if (this.item.name !== stateStore.nextName()) {
      this.failTouch();
      return;
    }
    this.correctAnimationObject.runAnimation();
    this.isOpen = false;
    stateStore.setItems(this.item.name);

    this.model.animations.forEach(clip => {
      const action = this.modelMixer?.clipAction(clip);
      action.clampWhenFinished = true;
      action?.reset();
      action?.stop();
      this.openAnimationObject.stopAnimation();
    });
    this.animate(`${this.item.aniName}_close`, {
      clampWhenFinished: true,
    }).then(() => {
      this.openAnimationObject.stopAnimation();
      this.callBackFinishAnimation();
    });
  }
  failTouch() {
    this.wrongAnimationObject.runAnimation();
    this.parent.children.forEach((child, i) => {
      if (i >= 5) return;
      else if (child.isOpen) return;
      child.isOpen = true;
      child.model.animations.forEach(clip => {
        const action = child.modelMixer?.clipAction(clip);
        action.clampWhenFinished = true;
        action?.reset();
        action?.stop();
        child.animate(`${child.item.aniName}`, { clampWhenFinished: true });
        child.openAnimationObject.openAnimation().then(() => {
          child.afterOpenAnimation();
        });
      });
    });
    this.isOpen = true;
    stateStore.rollbackItems();
  }
  callBackFinishAnimation() {
    stateStore.setIsFinished(this.item.name);
    if (
      stateStore
        .getState()
        .items.every(item => item.isCollected && item.isFinished)
    ) {
      this.parent.children.forEach((child, i) => {
        if (i >= 5) return;
        // setTimeout(() => {
        // child.modelGroup.position.set(
        //   stateStore.getState().position[i][0],
        //   stateStore.getState().position[i][1],
        //   stateStore.getState().position[i][2]
        // );
        child.isOpen = true;
        setTimeout(() => {
          child.animate(`${child.item.aniName}`);
          child.openAnimationObject.position.copy(child.position);
          child.openAnimationObject.openAnimation().then(() => {
            child.afterOpenAnimation();
          });
        }, 1500);
        // }, 500);
        child.model.animations.forEach(clip => {
          const action = child.modelMixer?.clipAction(clip);
          action.clampWhenFinished = true;
          action?.reset();
          action?.stop();
        });
        child.openAnimationObject.stopAnimation();
      });
      stateStore.setCount();
      stateStore.setScore();
    }
  }

  addOpenAnimationObject(group) {
    group.appendChild(this.openAnimationObject);
    this.openAnimationObject.position.copy(this.position);
  }

  afterOpenAnimation() {
    this.openAnimationObject.runAnimation();
  }
  update() {
    // deltaTime을 곱해줘야 디바이스 성능에 따라 일정한 속도로 움직임
    // this.modelGroup.rotation.y += (Math.PI / 4) * deltaTime; //초당 90도
  }
  render(): void {
    // 모델이 로드되었을때만 렌더링
    super.render();
    if (this.isLoaded && stateStore.getState().ready) {
      this.modelMixer?.update(deltaTime);
    }
  }
}
