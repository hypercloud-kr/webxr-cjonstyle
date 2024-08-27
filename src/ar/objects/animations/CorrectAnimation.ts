import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import * as THREE from 'three';
import openAnimationModel from '../../../assets/models/box_ugg.glb';
import { deltaTime } from '@/ar/ArManager';

export class CorrectAnimation extends XrObject {
  constructor() {
    super();
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF(openAnimationModel)
      .then(this.onLoadModel.bind(this));
  }

  protected onLoadModelFinished() {
    this.modelGroup.visible = false;
    this.modelGroup.userData.id = null;
    // this.modelGroup.scale.set(2, 2, 2);
    console.log(this.modelGroup);
    this.setAnimation({
      mode: THREE.LoopOnce,
      repetitions: 1,
    });
  }

  runAnimation() {
    console.log(this.animationsMap);
    this.modelGroup.visible = true;
    const action = this.animationsMap.get('2');
    action?.reset();
    this.animate('2').then(() => {
      console.log('??');
      this.modelGroup.visible = false;
    });
  }

  update() {}
  render(): void {
    // 모델이 로드되었을때만 렌더링
    if (this.isLoaded) {
      this.modelMixer?.update(deltaTime);
    }
  }
}
