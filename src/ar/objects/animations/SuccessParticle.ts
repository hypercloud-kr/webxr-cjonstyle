import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import * as THREE from 'three';
import clickParticleModel from '../../../assets/models/ClickCircleParticle.glb';
import { deltaTime } from '@/ar/ArManager';

export class SuccessParticle extends XrObject {
  constructor() {
    super();
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF(clickParticleModel)
      .then(this.onLoadModel.bind(this));
  }

  protected onLoadModelFinished() {
    this.modelGroup.visible = false;
    this.modelGroup.userData.id = null;
    this.setAnimation({
      mode: THREE.LoopOnce,
      repetitions: 1,
    });
  }

  runAnimation() {
    // console.log(this.animationsMap);
    this.modelGroup.visible = true;
    const action = this.animationsMap.get('Animation');
    this.animate('Animation').then(() => {
      this.modelGroup.visible = false;
      action?.reset();
      action?.stop();
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
