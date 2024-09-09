import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
// import { deltaTime } from '@/ar/ArManager';
import { OpenAnimationLight } from './OpenAnimationLight';
import { OpenAnimationParticle } from './OpenAnimationParticle';

export class OpenAnimation extends XrObject {
  lightAnimation: OpenAnimationLight;
  particleAnimation: OpenAnimationParticle;
  constructor() {
    super();
    // 오브젝트 기본값 설정
    this.lightAnimation = new OpenAnimationLight();
    this.appendChild(this.lightAnimation);
    this.particleAnimation = new OpenAnimationParticle();
    this.appendChild(this.particleAnimation);
    this.modelGroup.userData.id = null;
  }

  async openAnimation() {
    await this.lightAnimation.openAnimation();
    await this.particleAnimation.openAnimation();
  }

  runAnimation() {
    this.lightAnimation.runAnimation();
    this.particleAnimation.runAnimation();
  }

  stopAnimation() {
    this.lightAnimation.stopAnimation();
    this.particleAnimation.stopAnimation();
  }

  update() {}
  render(): void {
    super.render();
  }
}
