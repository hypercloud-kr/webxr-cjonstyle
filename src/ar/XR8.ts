import { ArManager, updateDeltaTime } from '@/ar/ArManager';

declare let XR8: any;
declare let XRExtras: any;

declare global {
  interface Window {
    LandingPage: any;
  }
}

export const load8ThWall = (canvas: HTMLCanvasElement) => {
  XR8.addCameraPipelineModules([
    // 여기에 XR8 설정을 추가해주세요
    XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
    XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
    XR8.XrController.pipelineModule(), // Enables SLAM tracking.
    window.LandingPage.pipelineModule(), // Detects unsupported browsers and gives hints.
    XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
    XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
    XR8Renderer(canvas),
  ]);
  const allowedDevices = XR8.XrConfig.device().ANY;
  XR8.XrController.configure({ imageTargets: [] });

  // Open the camera and start running the camera run loop.
  XR8.run({ canvas, allowedDevices });
};

const XR8Renderer = (canvas: HTMLCanvasElement) => ({
  name: 'webxr-boilerplate',
  onStart: () => {
    XR8.Threejs.configure({ renderCameraTexture: false });
    const xrScene = XR8.Threejs.xrScene(); // Get the 3js scene from XR8.Threejs
    if (!xrScene) location.reload();
    xrScene.renderer.antialias = true;
    xrScene.renderer.alpha = true;
    // Scene 관련 로직
    ArManager.init({
      canvas,
      scene: xrScene.scene,
      camera: xrScene.camera,
      renderer: xrScene.renderer,
    });
    XR8.XrController.updateCameraProjectionMatrix({
      origin: ArManager.instance.xr8Camera.position,
      facing: ArManager.instance.xr8Camera.quaternion,
    });
  },
  onUpdate: () => {
    updateDeltaTime();
    ArManager.instance.update();
  },
  // onAttach: ({ canvas, video, GLctx }) => {},
  onCanvasSizeChange: ({
    // GLctx,
    // videoWidth,
    // videoHeight,
    canvasWidth,
    canvasHeight,
  }: any) => {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  },
  onRender: () => {
    // const { renderer } = XR8.Threejs.xrScene(); // Get the 3js scene from XR8.Threejs
    ArManager.instance.render();
  },
});
