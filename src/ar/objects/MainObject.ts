import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { ArManager, deltaTime } from '@/ar/ArManager.ts';
import * as THREE from 'three';
import { TouchableModelModule } from '@hypercloud-kr/webxr-node/dist/modules/touch/TouchableModel';
import { stateStore } from '@/ar/storage';

export class MainObject extends XrObject {
  touchableModelModule;
  item;
  constructor(item) {
    super();
    this.item = item;
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF(item.url)
      .then(this.onLoadModel.bind(this));

    this.touchableModelModule = new TouchableModelModule(this);
    this.modules.push(this.touchableModelModule);
    this.touchableModelModule.onTouch = this.onTouch.bind(this);
    console.log(this.modelGroup.userData, this.modelGroup);
  }

  protected onLoadModelFinished() {
    // 모델 로드 완료 후 처리
    // this.modelGroup.scale.set(5,5,5);
    this.setAnimation({
      mode: THREE.LoopRepeat,
    });
    setTimeout(() => {
      this.animate('1');
    }, this.item.animateDelay * 1000);
    // this.animate('GiftBox_Ani02_zeroPoint_Anim_0').then(() => {
    //   this.callBackFinishAnimation();
    // });
    stateStore.setModelLoaded();
  }

  public runAnimationOpen() {
    const action = this.animationsMap.get('GiftBox_Ani02_zeroPoint_Anim_0');
    action?.stop();
    setTimeout(() => {
      this.animate('2');
    }, this.item.animateDelay * 1000);
  }

  onTouch(mesh?: THREE.Intersection[]) {
    console.log(this.model.scene, mesh, this.item.name, stateStore.nextName());
    if (this.item.name !== stateStore.nextName()) {
      return;
    }
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
        console.log(i, stateStore.getState().position);
        setTimeout(() => {
          child.modelGroup.position.set(
            stateStore.getState().position[i][0],
            stateStore.getState().position[i][1],
            stateStore.getState().position[i][2]
          );
        }, 1100);
        child.model.animations.forEach(clip => {
          const action = child.modelMixer?.clipAction(clip);
          action.clampWhenFinished = true;
          action?.reset();
          action?.stop();
        });
      });
      stateStore.setCount();
      stateStore.setScore();
      // stateStore.setGameState('end');
    }
  }
  update() {
    // deltaTime을 곱해줘야 디바이스 성능에 따라 일정한 속도로 움직임
    this.modelGroup.rotation.y += (Math.PI / 4) * deltaTime; //초당 90도
  }
  render(): void {
    // 모델이 로드되었을때만 렌더링
    if (this.isLoaded && ArManager.instance.ready) {
      this.modelMixer?.update(deltaTime);
    }
  }
}
