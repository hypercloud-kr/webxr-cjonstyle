import { XrScene } from '@hypercloud-kr/webxr-node/dist/XrScene';
import { XrSceneConfig } from '@hypercloud-kr/webxr-node/dist/XrScene.ts';
import { MainObject } from '@/ar/objects/MainObject';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { setEnvironment } from './background/background';
import Environment from '@/assets/imgs/Bluesky (1).jpg'; //'@/assets/imgs/environment.jpg';
import { Loader } from './background/loader';
import { objectArr } from './constants/constants';
import { stateStore } from '@/ar/storage';
// import { PlaneObject } from './objects/PlaneObjet';
import { MainGroup } from './objects/MainGroup';
import { PlaneGrid } from './objects/PlaneGrid';
import { addLight } from '@/utils/threeUtil';
// import { ShaderObject } from './objects/ShaderObject';

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
      'img',
      Environment,
      Loader.textureLoader
    );
    stateStore.sufflePosition();
    stateStore.initItems();
    const position = stateStore.getState().position;
    const sampleObject = new MainObject(objectArr[0]);
    sampleObject.position.set(position[0][0], position[0][1], position[0][2]);
    // this.appendChild(sampleObject);

    const sampleObject2 = new MainObject(objectArr[1]);
    sampleObject2.position.set(position[1][0], position[1][1], position[1][2]);
    // this.appendChild(sampleObject2);

    const sampleObject3 = new MainObject(objectArr[2]);
    sampleObject3.position.set(position[2][0], position[2][1], position[2][2]);
    // this.appendChild(sampleObject3);

    const sampleObject4 = new MainObject(objectArr[3]);
    sampleObject4.position.set(position[3][0], position[3][1], position[3][2]);
    // this.appendChild(sampleObject4);

    const sampleObject5 = new MainObject(objectArr[4]);
    sampleObject5.position.set(position[4][0], position[4][1], position[4][2]);
    // this.appendChild(sampleObject5);

    const plane = new PlaneGrid();
    plane.position.set(0, -1, 0);
    // this.appendChild(plane);
    const group = new MainGroup(plane);
    group.appendChild(sampleObject);
    group.appendChild(sampleObject2);
    group.appendChild(sampleObject3);
    group.appendChild(sampleObject4);
    group.appendChild(sampleObject5);
    group.appendChild(plane);
    this.appendChild(group);
    addLight(this.scene);
    // const a = new ShaderObject(this.scene)
    // this.appendChild(a);
  }
  release(): void {
    super.release();
  }
  render(): void {
    super.render();
  }
}
