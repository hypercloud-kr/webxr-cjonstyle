export const addOrientationEvent = handleOrientation => {
  window.addEventListener('deviceorientation', handleOrientation);
  const requestPermission = (
    window.DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
  )?.requestPermission;
  if (
    typeof DeviceMotionEvent !== 'undefined' &&
    typeof requestPermission === 'function'
  ) {
    requestPermission().then(response => {
      if (response === 'granted') {
        window.addEventListener('devicemotion', handleOrientation);
      }
    });
  }
};

export const removeOrientationEvent = handleOrientation => {
  window.removeEventListener('deviceorientation', handleOrientation);
  window.removeEventListener('devicemotion', handleOrientation);
};
