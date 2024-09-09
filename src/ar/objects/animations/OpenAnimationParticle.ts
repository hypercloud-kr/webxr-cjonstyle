import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import * as THREE from 'three';
import openParticleAnimationModel from '../../../assets/models/BoxOpenGradationParticle2Only.glb';
import { deltaTime } from '@/ar/ArManager';

export class OpenAnimationParticle extends XrObject {
  constructor() {
    super();
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF(openParticleAnimationModel)
      .then(this.onLoadModel.bind(this));
  }

  protected onLoadModelFinished() {
    this.modelGroup.userData.id = null;
    // this.modelGroup.scale.set(0.5, 0.5, 0.5);
    this.setAnimation({
      mode: THREE.LoopOnce,
      timeScale: 2,
    });
  }

  openAnimation() {
    return this.animate('Animation');
  }

  runAnimation() {
    this.animate('Animation', {
      mode: THREE.LoopRepeat,
      clampWhenFinished: true,
    });
  }

  stopAnimation() {
    this.modelMixer?.stopAllAction();
  }

  update() {}
  render(): void {
    // 모델이 로드되었을때만 렌더링
    if (this.isLoaded) {
      this.modelMixer?.update(deltaTime);
    }
  }
}
