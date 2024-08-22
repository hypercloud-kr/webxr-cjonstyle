import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import * as THREE from 'three';

export class PlaneGrid extends XrObject {
  constructor() {
    super();
    // 오브젝트 기본값 설정
    // ResourceManager.instance
    //   .loadGLTF(item.url)
    //   .then(this.onLoadModel.bind(this));
    // const geometry = new THREE.BoxGeometry(10, 0.1, 10);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const size = 10;
    const divisions = 5;
    const colorGrid = '#A020F0';
    const gridHelper = new THREE.GridHelper(
      size,
      divisions,
      colorGrid,
      colorGrid
    );
    gridHelper.rotation.y = Math.PI / 4;
    this.model = gridHelper; //new THREE.Mesh(geometry, material);
    this.modelGroup.add(gridHelper);
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
