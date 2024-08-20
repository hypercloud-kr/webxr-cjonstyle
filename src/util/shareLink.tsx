type ShareLinkType = {
  url: string;
};

export function shareLink({ url }: ShareLinkType) {
  //@ts-expect-error ts-igonre
  return new Promise(resolve => {
    if (navigator?.share) {
      try {
        navigator.share({ url }).then(() => {
          resolve('링크가 공유 되었습니다.');
        });
      } catch (err) {
        // 공유하지 않고 공유 팝업을 닫은 경우(abort due to cancellation of share)
        console.error(err);
        resolve('');
      }
    } else {
      // navigator?.share 지원하지 않는 경우: PC chrome, safari
      navigator.clipboard.writeText(url).then(() => {
        resolve('클립보드에 복사되었습니다!');
      });
    }
  });
}
