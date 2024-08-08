import { XrScene } from '@hypercloud-kr/webxr-node/dist/XrScene';
import { XrSceneConfig } from '@hypercloud-kr/webxr-node/dist/XrScene.ts';
import { MainObject } from '@/ar/objects/MainObject';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { setEnvironment } from './background/background';
import Environment from '@/assets/imgs/environment.jpg';
import { Loader } from './background/loader';

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
    const sampleObject = new MainObject();
    this.appendChild(sampleObject);
  }
}
