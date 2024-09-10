import * as THREE from 'three';

export const addLight = scene => {
  const directLight = new THREE.DirectionalLight('#FFFFFF', 2.5);
  scene.add(directLight);
  // directLight.position.set(-8, 9, 12);
  // directLight.color.set('#DBDFFF');
  // directLight.name = 'main_light';
  directLight.castShadow = true;
  directLight.shadow.mapSize.width = 512 * 4; // default
  directLight.shadow.mapSize.height = 512 * 4; // default
  directLight.shadow.camera.near = 0.5; // default
  directLight.shadow.camera.far = 100000; // default
  // directLight.shadow.camera.fov = 50; // default
  // // directLight.shadow.radius = 1; // default
  directLight.shadow.camera.left = 150;
  directLight.shadow.camera.right = -150;
  directLight.shadow.camera.top = 150;
  directLight.shadow.camera.bottom = -150;
  directLight.shadow.bias = -0.00001; //0.00107
  // directLight.shadow.normalBias = 0.01;
  directLight.target = new THREE.Object3D();
  scene.add(directLight.target);
  return directLight;
};
