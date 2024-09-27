import { getEnvInfo } from '@/ar/constants/apiConstants';
import axios from 'axios';

declare global {
  interface Window {
    ET: any;
    getEtObject: () => any;
  }
}
export enum FunnelAttributionType {
  SCENE_START = 'Scene_Start',
  EVENT_CLICK = 'Event_Click',

  // ARScan
  POI_SCAN = 'POI_Scan',
  POI_SELECTED = 'POI_Selected',
  BRAND_CATCHER_SIGN = 'Brand_Catcher_Sign',
  BRAND_CATCHER_COUPON_SAVE = 'Brand_Catcher_Coupon_Save',

  // ARTimesale
  POI_AREA_DETECTED = 'POI_Area_Detected',
  REWARD_BOX_SELECTED = 'Reward_Box_Selected',

  // ARPortal
  IMAGE_DETECTED = 'Image_Detected',
  PORTAL_GENERATED = 'Portal_Generated',
  PORTAL_IN = 'Portal_In',
  PORTAL_OUT = 'Portal_Out',
  PORTAL_CLOSE = 'Portal_Close',
  GUIDE_PAGE_IN = 'Guide_Page_In',
  REWARD_CLICK = 'Reward_Click',
  REWARD_RECEIVE = 'Reward_Receive',
  PORTAL_INFO = 'Portal_Info',
  GET_ITEM_CNT = 'Get_Item_Cnt',
}

export enum OnBoardingEventType {
  ONBOARDING_1 = 'Onboarding_1',
  ONBOARDING_2 = 'Onboarding_2',
  ONBOARDING_3 = 'Onboarding_3',
}

export enum TimeSaleEventType {
  PLANE_RECOGNITION = 'plane_recognition', // 바닥 인식
  EVENT_MODEL_CLICK = 'event_model_click', // claw 머신 클릭
  SCREEN_CAPTURE = 'screen_capture', // 화면 캡쳐
  BACK_CLICK = 'back_click', // 뒤로가기 클릭
  SAVE_PHOTO = 'save_photo', // 사진 저장
  TIMESALE_INFO = 'Timesale_Info', // info 페이지 진입
}

export enum XRPageType {
  QR_EVENT_PAGE = 'Qr_Event_Page',
  AR_ADVENTURE_PASS = 'Ar_Adventure_Pass',
  WEB_XR_DUTY_FREE_TOUR = 'Web_Xr_Duty_Free_Tour',
}

interface StackFunnelProps {
  appKey: string;
  deviceId: string;
  campaignId: number | string;
  attributionType: FunnelAttributionType | string;
  details?: any;
}

export const stackFunnelApi = ({
  campaignId,
  attributionType,
  details,
  deviceId,
  appKey,
}: StackFunnelProps) => {
  axios
    .post(
      `${getEnvInfo().url}client/funnel/stack`, //process.env.VITE_HARS_API
      {
        campaignId,
        attributionType,
        details,
      },
      {
        headers: {
          deviceInfo: deviceId ? JSON.stringify({ deviceId }) : '',
          appKey,
        },
      }
    )
    // Promise 해제하기 위함
    .then()
    .catch();
};

let campaignId: number | string;
let deviceId: string;
let appKey: string;
let isInit: boolean = false;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let details: any;

export class SolutionFunnel {
  static init(props: Omit<StackFunnelProps, 'attributionType'>) {
    isInit = true;
    deviceId = props.deviceId;
    appKey = props.appKey;
    campaignId = props.campaignId;
    details = props.details;
  }

  public static reset() {
    isInit = false;
  }

  static stack(attributionType: FunnelAttributionType | string, details?: any) {
    if (!isInit) {
      console.trace('SolutionFunnel is not initialized');
      return;
    }
    stackFunnelApi({
      campaignId,
      attributionType,
      details,
      deviceId,
      appKey,
    });
  }
}

export const stackFunnel = SolutionFunnel.stack;
