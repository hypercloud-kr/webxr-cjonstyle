import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import * as THREE from 'three';
import closeLightAnimationModel from '../../../assets/models/BoxOpenGradationLightClose.glb';
import { deltaTime } from '@/ar/ArManager';

export class CloseAnimationLight extends XrObject {
  constructor() {
    super();
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF(closeLightAnimationModel)
      .then(this.onLoadModel.bind(this));
  }

  protected onLoadModelFinished() {
    this.modelGroup.visible = false;
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
    this.modelGroup.visible = true;
    this.animate('Animation', {
      mode: THREE.LoopOnce,
      clampWhenFinished: true,
    });
  }

  stopAnimation() {
    this.modelGroup.visible = false;
    this.model.animations.forEach(clip => {
      const action = this.modelMixer?.clipAction(clip);
      action.clampWhenFinished = true;
      action?.reset();
      action?.stop();
    });
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
