import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
// import { deltaTime } from '@/ar/ArManager';
import { OpenAnimationLight } from './OpenAnimationLight';
import { OpenAnimationParticle } from './OpenAnimationParticle';
import { CloseAnimationLight } from './CloseAnimationLight';
import { RunAnimationLight } from './RunAnimationLight';

export class OpenAnimation extends XrObject {
  lightAnimation: OpenAnimationLight;
  particleAnimation: OpenAnimationParticle;
  constructor() {
    super();
    // 오브젝트 기본값 설정
    this.lightOpenAnimation = new OpenAnimationLight();
    this.appendChild(this.lightOpenAnimation);
    this.runlightAnimation = new RunAnimationLight();
    this.appendChild(this.runlightAnimation);
    this.closeAnimation = new CloseAnimationLight();
    this.appendChild(this.closeAnimation);

    this.particleAnimation = new OpenAnimationParticle();
    this.appendChild(this.particleAnimation);
    this.modelGroup.userData.id = null;
  }

  async openAnimation() {
    await this.lightOpenAnimation.runAnimation();
    this.particleAnimation.openAnimation();
  }

  runAnimation() {
    this.runlightAnimation.runAnimation();
    this.lightOpenAnimation.stopAnimation();
    this.particleAnimation.runAnimation();
  }

  stopAnimation() {
    this.lightOpenAnimation.stopAnimation();
    this.runlightAnimation.stopAnimation();
    this.particleAnimation.stopAnimation();
    this.closeAnimation.runAnimation();
  }

  update() {}
  render(): void {
    super.render();
  }
}
