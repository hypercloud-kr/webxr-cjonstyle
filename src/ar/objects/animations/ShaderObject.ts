import { XrObject } from '@hypercloud-kr/webxr-node/dist/XrObject';
import { ResourceManager } from '@hypercloud-kr/graphics-components';
import { deltaTime } from '@/ar/ArManager.ts';
// import axios from 'axios';
// import { getDeviceId } from '../../util/util';
import { shaderLoader } from '@hypercloud-kr/shader-components/dist/nodeToy/Shader';
import { animateShader } from '@hypercloud-kr/shader-components/dist/nodeToy/Shader';
import { data } from '@/assets/shaders/ClickCircleEffect.js';
import ShaderModel from '@/assets/models/ClickCircleEffect.glb';

export class ShaderObject extends XrObject {
  constructor() {
    super();
    // 오브젝트 기본값 설정
    ResourceManager.instance
      .loadGLTF(ShaderModel)
      .then(this.onLoadModel.bind(this));
  }

  protected onLoadModelFinished() {
    this.modelGroup.visible = false;
    this.modelGroup.userData.id = null;
    this.setAnimation({
      mode: THREE.LoopOnce,
      repetitions: 1,
    });
    createShaderData(this.modelGroup, data);
  }

  runAnimation() {
    // console.log(this.animationsMap);
    this.modelGroup.visible = true;
    const action = this.animationsMap.get('SphereAction');
    this.animate('SphereAction').then(() => {
      this.modelGroup.visible = false;
      action?.reset();
      action?.stop();
    });
  }

  update() {
    // deltaTime을 곱해줘야 디바이스 성능에 따라 일정한 속도로 움직임
    // this.modelGroup.rotation.y += (Math.PI / 4) * deltaTime; //초당 90도
  }
  render(): void {
    // 모델이 로드되었을때만 렌더링
    super.render();
    if (this.isLoaded) {
      animateShader();
      this.modelMixer?.update(deltaTime);
    }
  }
}

const createShaderData = async (scene, data) => {
  // scene.position.set(0, 1, -5);
  // scene.scale.set(2, 2, 2);
  scene.name = 'shaderModel';
  scene.traverse(function (object: any) {
    if (object.isMesh) {
      object.frustumCulled = false;
      object.castShadow = true;
      object.receiveShadow = true;
      object.material = shaderLoader(data);
    }
  });
};
