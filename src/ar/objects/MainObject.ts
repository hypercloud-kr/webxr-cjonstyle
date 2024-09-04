import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { deltaTime } from '@/ar/ArManager.ts';
import * as THREE from 'three';
import { TouchableModelModule } from '@hypercloud-kr/webxr-node/dist/modules/touch/TouchableModel';
import { stateStore } from '@/ar/storage';
import { OpenAnimation } from './animations/OpenAnimation';
import { CorrectAnimation } from './animations/CorrectAnimation';
import { WrongAnimation } from './animations/WrongAnimation';

export class MainObject extends XrObject {
  touchableModelModule;
  item;
  openAnimationObject;
  correctAnimationObject;
  wrongAnimationObject;
  isFinishAnimation = false;
  constructor(item) {
    super();
    this.item = item;
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF(item.url)
      .then(this.onLoadModel.bind(this));

    this.openAnimationObject = new OpenAnimation();
    this.openAnimationObject.position.copy(this.position);
    this.appendChild(this.openAnimationObject);

    this.correctAnimationObject = new CorrectAnimation();
    this.correctAnimationObject.position.copy(this.position);
    this.appendChild(this.correctAnimationObject);

    this.wrongAnimationObject = new WrongAnimation();
    this.wrongAnimationObject.position.copy(this.position);
    this.appendChild(this.wrongAnimationObject);
    // this.touchableModelModule = new TouchableModelModule(this);
    // this.modules.push(this.touchableModelModule);
    // this.touchableModelModule.onTouch = this.onTouch.bind(this);
    // console.log(this.modelGroup.userData, this.modelGroup);
  }

  protected onLoadModelFinished() {
    // 모델 로드 완료 후 처리
    // this.modelGroup.scale.set(5,5,5);
    this.modelGroup.traverse(item => {
      if (item.isMesh) {
        item.castShadow = true;
        item.receiveShadow = true;
        if (item.material.name === 'box_tex_Base_color.004') {
          item.material.map.anisotropy =
            this.parent.parent.renderer.capabilities.getMaxAnisotropy();
          // item.material.map.minFilter = THREE.LinearMipMapLinearFilter;
          // item.material.refractionRatio = 0.98;
        }
      }
    });
    this.setAnimation({
      mode: THREE.LoopOnce,
      repetitions: 1,
      timeScale: 2,
    });
    setTimeout(() => {
      this.animate('box_1');
    }, this.item.animateDelay * 1000);
    // this.animate('GiftBox_Ani02_zeroPoint_Anim_0').then(() => {
    //   this.callBackFinishAnimation();
    // });
    stateStore.setModelLoaded();
  }

  public runAnimationOpen() {
    this.touchableModelModule = new TouchableModelModule(this);
    this.modules.push(this.touchableModelModule);
    this.touchableModelModule.onTouch = this.onTouch.bind(this);
    // console.log(this.modelGroup.userData, this.modelGroup);
    const action = this.animationsMap.get('box_1');
    action?.stop();
    setTimeout(() => {
      this.animate(this.item.aniName).then(() => {
        this.isFinishAnimation = true;
        this.openAnimationObject.stopAnimation();
        this.parent.finishChildAnimation();
      });
      this.openAnimationObject.runAnimation();
    }, this.item.animateDelay * 1000);
  }

  public runAnimation(delay) {
    const action = this.animationsMap.get(this.item.aniName);
    // action?.stop();
    // action?.play();
    if (action) {
      // action.time = 0;
      // action.clampWhenFinished = true;
      // action.setLoop(THREE.LoopOnce, 1);
    }
    // const delayArr = [0.1, 0.2, 0.3, 0.4, 0.5].sort(() => Math.random() - 0.5);
    // const delay = Math.random() * 0.5;
    setTimeout(() => {
      action?.reset();
      this.animate(this.item.aniName).then(() => {
        this.isFinishAnimation = true;
        this.openAnimationObject.stopAnimation();
        this.parent.finishChildAnimation();
      });
      this.openAnimationObject.runAnimation();
    }, delay * 1000);
  }

  onTouch(mesh?: THREE.Intersection[]) {
    console.log(this.model.scene, mesh, this.item.name, stateStore.nextName());
    if (this.item.name !== stateStore.nextName()) {
      this.wrongAnimationObject.runAnimation();
      return;
    }
    this.correctAnimationObject.runAnimation();
    // this.animate('GiftBox_Ani02_zeroPoint_Anim_0').then(() => {
    //   console.log('finish', stateStore.getState());
    // });

    stateStore.setItems(this.item.name);
    this.callBackFinishAnimation();
    // this.model.animations.forEach((clip) => {
    //   const action = this.modelMixer.clipAction(clip);
    //   action.stop();
    // });
  }

  callBackFinishAnimation() {
    console.log('finish', stateStore.getState());
    stateStore.setIsFinished(this.item.name);
    if (
      stateStore
        .getState()
        .items.every(item => item.isCollected && item.isFinished)
    ) {
      this.parent.children.forEach((child, i) => {
        if (i >= 5) return;
        setTimeout(() => {
          child.modelGroup.position.set(
            stateStore.getState().position[i][0],
            stateStore.getState().position[i][1],
            stateStore.getState().position[i][2]
          );
          setTimeout(() => {
            child.animate(child.item.aniName);
            child.openAnimationObject.runAnimation();
          }, child.item.animateDelay * 1000);
        }, 1100);
        child.model.animations.forEach(clip => {
          const action = child.modelMixer?.clipAction(clip);
          action.clampWhenFinished = true;
          action?.reset();
          action?.stop();
          child.openAnimationObject.stopAnimation();
        });
      });
      stateStore.setCount();
      stateStore.setScore();
      // stateStore.setGameState('end');
    }
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
