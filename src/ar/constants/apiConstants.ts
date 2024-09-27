export const getEnvInfo = () => {
  let appKey: string;
  let campaignId: number;
  let url: string;

  if (process.env.NODE_ENV === 'production') {
    appKey = 'aa32beb9-5c79-4016-a0f4-b2a0bb489c42';
    campaignId = 56;
    url = `https://api.hars.kr/`;
  } else {
    appKey = '5949c082-0b98-469e-9e64-f2690c382642';
    campaignId = 401;
    url = `https://api.dev.hars.kr/`;
  }
  return { appKey, campaignId, url };
};
