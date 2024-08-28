// import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
// import * as THREE from 'three';
// import openAnimationModel from '../../../assets/models/CJbox.glb';
// import { deltaTime } from '@/ar/ArManager';
import { SuccessParticle } from './SuccessParticle';
import { ShaderObject } from './ShaderObject';

export class CorrectAnimation extends XrObject {
  successParticle;
  successEffect;
  constructor() {
    super();
    // 오브젝트 기본값 설정
    this.successParticle = new SuccessParticle();
    this.appendChild(this.successParticle);
    this.successEffect = new ShaderObject();
    this.appendChild(this.successEffect);
    this.modelGroup.userData.id = null;
  }

  runAnimation() {
    this.successParticle.runAnimation();
    this.successEffect.runAnimation();
  }

  update() {}
  render(): void {
    super.render();
  }
}
