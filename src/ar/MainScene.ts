import { XrScene } from '@hypercloud-kr/webxr-node/dist/XrScene';
import { XrSceneConfig } from '@hypercloud-kr/webxr-node/dist/XrScene.ts';
import { MainObject } from '@/ar/objects/MainObject';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { setEnvironment } from './background/background';
import Environment from '@/assets/imgs/environment.jpg';
import { Loader } from './background/loader';
import { objectArr } from './constants/constants';
import { stateStore } from '@/ar/storage';
import { PlaneObject } from './objects/PlaneObjet';

type SampleSceneConfig = XrSceneConfig & {
  someProps?: string;
};

export class MainScene extends XrScene {
  constructor(config: SampleSceneConfig) {
    super(config);
    ResourceManager.init(this.renderer, this.scene);
    this.camera.position.set(0, 1, 2);
    // 카메라, renderer, scene, light등 설정
    Loader.getInstance().init();
    setEnvironment(
      this.scene,
      this.renderer,
      'img',
      Environment,
      Loader.textureLoader
    );
    objectArr.sort(() => Math.random() - 0.5);
    stateStore.setSuffleItems();
    const sampleObject = new MainObject(objectArr[0]);
    this.appendChild(sampleObject);

    const sampleObject2 = new MainObject(objectArr[1]);
    sampleObject2.position.set(0, 0, -5);
    this.appendChild(sampleObject2);

    const sampleObject3 = new MainObject(objectArr[2]);
    sampleObject3.position.set(0, 0, -2);
    this.appendChild(sampleObject3);

    const sampleObject4 = new MainObject(objectArr[3]);
    sampleObject4.position.set(-2, 0, 0);
    this.appendChild(sampleObject4);

    const sampleObject5 = new MainObject(objectArr[4]);
    sampleObject5.position.set(2, 0, 0);
    this.appendChild(sampleObject5);

    const plane = new PlaneObject();
    this.appendChild(plane);
  }
  release(): void {
    super.release();
  }
}
