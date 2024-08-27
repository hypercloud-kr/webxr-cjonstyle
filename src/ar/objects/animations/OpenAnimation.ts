import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import * as THREE from 'three';
import openAnimationModel from '../../../assets/models/box_ugg.glb';
import { deltaTime } from '@/ar/ArManager';

export class OpenAnimation extends XrObject {
  constructor() {
    super();
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF(openAnimationModel)
      .then(this.onLoadModel.bind(this));
    // const geometry = new THREE.BoxGeometry(10, 0.1, 10);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  }

  protected onLoadModelFinished() {
    this.modelGroup.userData.id = null;
    this.modelGroup.scale.set(0.5, 0.5, 0.5);
    this.setAnimation({
      mode: THREE.LoopRepeat,
    });
  }

  runAnimation() {
    this.animate('2');
  }

  update() {}
  render(): void {
    // 모델이 로드되었을때만 렌더링
    if (this.isLoaded) {
      this.modelMixer?.update(deltaTime);
    }
  }
}
