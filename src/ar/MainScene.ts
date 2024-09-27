import { XrScene } from '@hypercloud-kr/webxr-node/dist/XrScene';
import { XrSceneConfig } from '@hypercloud-kr/webxr-node/dist/XrScene.ts';
import { MainObject } from '@/ar/objects/MainObject';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { setEnvironment } from './background/background';
import Environment from '@/assets/imgs/Bluesky (1).jpg'; //'@/assets/imgs/environment.jpg';
import { Loader } from './background/loader';
import { objectArr } from './constants/constants';
import { stateStore } from '@/ar/storage';
import { MainGroup } from './objects/MainGroup';
import { XrNode } from '@hypercloud-kr/webxr-node/dist/XrNode';

type SampleSceneConfig = XrSceneConfig & {
  someProps?: string;
};

export class MainScene extends XrScene {
  constructor(config: SampleSceneConfig) {
    super(config);
    ResourceManager.init(this.renderer, this.scene);
    this.camera.position.set(0, 5, 2);
    // 카메라, renderer, scene, light등 설정
    Loader.getInstance().init();
    setEnvironment(
      this.scene,
      this.renderer,
      'room',
      Environment,
      Loader.textureLoader
    );
    stateStore.sufflePosition();
    stateStore.initItems();
    const position = stateStore.getState().position;
    const group = new MainGroup();
    const sampleObjects: MainObject[] = [];
    objectArr.forEach((item, i) => {
      const sampleObject = new MainObject(item);
      sampleObject.position.set(position[i][0], position[i][1], position[i][2]);

      group.appendChild(sampleObject);
      sampleObjects.push(sampleObject);
    });
    sampleObjects.forEach(item => {
      item.addOpenAnimationObject(group);
    });
    this.appendChild(group);
  }
  findNodeById(id: string): XrNode | undefined {
    return this.children.find(item => item.id === id);
  }
  release(): void {
    this.scene.traverse((obj: any) => {
      if (obj.geometry && obj.material) {
        if (obj.material.map) {
          obj.material.map.dispose();
        }
        obj.geometry.dispose();
        obj.material?.dispose();
      }
    });
    super.release();
  }
  render(): void {
    super.render();
  }
}
