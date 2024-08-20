import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const resourceCache = new Map<string, any>();

export const getResourceCache = (key: string) => resourceCache.get(key);

export const setResourceCache = (key: string, value: any) => {
  resourceCache.set(key, value);
};

export class ResourceManager {
  static loadResource(url: string, retry = 2) {
    const cachedModel = getResourceCache(url);
    if (cachedModel) {
      return cachedModel;
    }
    return fetch(url, {})
      .then(res => res.arrayBuffer())
      .then(buffer => {
        setResourceCache(url, buffer);
        return buffer;
      })
      .catch(e => {
        if (retry <= 0) throw e;
        this.loadResource(url, --retry);
      });
  }

  static async loadModel(url: string) {
    const modelBinary = await this.loadResource(url);
    const loader = new GLTFLoader().setCrossOrigin('anonymous');
    const model = await loader.parseAsync(modelBinary, url);
    return model;
  }
}
