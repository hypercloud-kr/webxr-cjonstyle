import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { deltaTime } from '@/ar/ArManager.ts';
import * as THREE from 'three';
import { TouchableModelModule } from '@hypercloud-kr/webxr-node/dist/modules/touch/TouchableModel';

export class MainObject extends XrObject {
  touchableModelModule;
  constructor() {
    super();
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF('https://asset.hyper-cloud.kr/develop/glb/GiftBox.glb')
      .then(this.onLoadModel.bind(this));

    this.touchableModelModule = new TouchableModelModule(this);
    this.modules.push(this.touchableModelModule);
    this.touchableModelModule.onTouch = this.onTouch.bind(this);
  }

  protected onLoadModelFinished() {
    // 모델 로드 완료 후 처리
    this.setAnimation({
      mode: THREE.LoopOnce,
      repetitions: 1,
    });
    this.animate('GiftBox_Ani02_zeroPoint_Anim_0').then(() => {
      this.callBackFinishAnimation();
    });
  }

  onTouch(mesh: any) {
    console.log(this.model.scene, mesh);
    // this.model.animations.forEach((clip) => {
    //   const action = this.modelMixer.clipAction(clip);
    //   action.stop();
    // });
  }

  callBackFinishAnimation() {
    console.log('finish');
  }

  update() {
    // deltaTime을 곱해줘야 디바이스 성능에 따라 일정한 속도로 움직임
    this.modelGroup.rotation.y += (Math.PI / 4) * deltaTime; //초당 90도
  }
  render(): void {
    // 모델이 로드되었을때만 렌더링
    if (this.isLoaded) {
      this.modelMixer?.update(deltaTime);
    }
  }
}
