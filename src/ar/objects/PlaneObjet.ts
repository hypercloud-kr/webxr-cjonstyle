import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import stage from '@/assets/models/ground.glb';

export class PlaneObject extends XrObject {
  constructor() {
    super();
    // 오브젝트 기본값 설정
    ResourceManager.instance.loadGLTF(stage).then(this.onLoadModel.bind(this));
    // const geometry = new THREE.BoxGeometry(10, 0.1, 10);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // this.model = new THREE.Mesh(geometry, material);
    // this.modelGroup.add(new THREE.Mesh(geometry, material));
  }

  protected onLoadModelFinished() {}

  update() {}
  render(): void {
    // 모델이 로드되었을때만 렌더링
    // if (this.isLoaded) {
    //   this.modelMixer?.update(deltaTime);
    // }
  }
}
