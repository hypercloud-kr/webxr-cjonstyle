import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import * as THREE from 'three';
import openLightAnimationModel from '../../../assets/models/BoxOpenGradationLight4Only.glb';
import { deltaTime } from '@/ar/ArManager';

export class OpenAnimationLight extends XrObject {
  constructor() {
    super();
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF(openLightAnimationModel)
      .then(this.onLoadModel.bind(this));
  }

  protected onLoadModelFinished() {
    this.modelGroup.userData.id = null;
    // this.modelGroup.scale.set(0.5, 0.5, 0.5);
    this.setAnimation({
      mode: THREE.LoopRepeat,
      timeScale: 1.5,
    });
  }

  runAnimation() {
    this.animate('Animation');
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
