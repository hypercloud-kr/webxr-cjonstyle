import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { deltaTime } from '@/ar/ArManager.ts';

export class SampleObject extends XrObject {
  constructor() {
    super();
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF('https://asset.hyper-cloud.kr/develop/glb/GiftBox.glb')
      .then(this.onLoadModel.bind(this));
  }

  protected onLoadModelFinished() {
    // 모델 로드 완료 후 처리
    this.animate('GiftBox_Ani02_zeroPoint_Anim_0');
  }

  update() {
    // deltaTime을 곱해줘야 디바이스 성능에 따라 일정한 속도로 움직임
    this.modelGroup.rotation.y += (Math.PI / 4) * deltaTime; //초당 90도
  }
}
