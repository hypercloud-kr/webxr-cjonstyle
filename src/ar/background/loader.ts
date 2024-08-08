import * as THREE from 'three';

export class Loader {
  static instance: Loader;
  public static textureLoader: THREE.TextureLoader;
  static getInstance() {
    if (!this.instance) {
      this.instance = new Loader();
    }
    return this.instance;
  }
  init() {
    Loader.textureLoader = new THREE.TextureLoader();
  }
}
