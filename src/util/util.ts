// slack inapp 브라우저 접속 후 링크 공유할때 & -> &amp; 로 변경 되는 오류 때문에 uuidv4 - 삭제
export function uuidv4() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function setDeviceId() {
  const deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    localStorage.setItem('deviceId', uuidv4());
  }
}

export function getDeviceId() {
  setDeviceId();
  const deviceId = localStorage.getItem('deviceId') || '';
  return deviceId;
}
