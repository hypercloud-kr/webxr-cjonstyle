import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export const setEnvironment = async (
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  type: string,
  path?: string,
  loader?: any
) => {
  try {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    if (type === 'room') {
      scene.environment = pmremGenerator.fromScene(
        new RoomEnvironment()
      ).texture;
    } else if (type === 'exr') {
      const texture = await new EXRLoader().loadAsync(path);
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      pmremGenerator.dispose();
      scene.environment = envMap;
    } else if (type === 'hdr') {
      const texture = await new RGBELoader().loadAsync(path);
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      texture.dispose();
      pmremGenerator.dispose();
      scene.background = envMap;
    } else if (type === 'img') {
      if (!loader) loader = new THREE.TextureLoader();
      const textureEquirec = loader.load(path);
      textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = textureEquirec;
    }
  } catch (e) {
    console.log(e);
  }
};
