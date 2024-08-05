import { XrScene } from '@hypercloud-kr/webxr-node/dist/XrScene';
import { XrSceneConfig } from '@hypercloud-kr/webxr-node/dist/XrScene.ts';
import { SampleObject } from '@/ar/sample/SampleObject.ts';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import * as THREE from 'three';

type SampleSceneConfig = XrSceneConfig & {
  someProps?: string;
};

export class SampleScene extends XrScene {
  constructor(config: SampleSceneConfig) {
    super(config);
    ResourceManager.init(this.renderer, this.scene);
    this.camera.position.set(0, 1, -2);
    this.camera.lookAt(0, 0, 0);
    // 카메라, renderer, scene, light등 설정
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment()
    ).texture;
    const sampleObject = new SampleObject();
    this.appendChild(sampleObject);
  }
}
