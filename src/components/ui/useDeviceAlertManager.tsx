import React, { ReactNode, useEffect } from 'react';
import { HcSwalRoot } from '../Modal/HCSwal';
import AlertModal from '../Modal/AlertModal';
import { createRoot } from 'react-dom/client';
import styled from '@emotion/styled';
import { palette, Guide } from '@hypercloud-kr/styling-kit';

// 8thWall 자체 Alert 커스터마이징을 위한 Hook
export default function useDeviceAlertManager() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const targetDom = document.querySelector('.prompt-box-8w');
      if (targetDom) {
        HcSwalRoot({
          component: (
            <AlertModal
              title={'AR 콘텐츠를 실행하기 위해 모션 센서를 허용해주세요'}
            />
          ),
        }).then(() => {
          (document.querySelector('.button-primary-8w') as any)?.click();
          // document.querySelector('.prompt-box-8w')?.remove();
        });
        // 다른 방식은 https://www.8thwall.com/docs/guides/advanced-topics/load-screen/ 참고
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true });
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const observers = ['#userPromptError', '#motionPermissionsErrorApple'].map(
      querySelector => {
        return replaceDom(
          querySelector,
          <FullDiv>
            <Guide.MotionPermission />
          </FullDiv>
        );
      }
    );
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  useEffect(() => {
    const observers = ['#requestingCameraPermissions', '#loadBackground'].map(
      (elementId: string) => {
        return replaceDom(
          elementId,
          <FullDiv>
            <Guide title={'Loading...'} />
          </FullDiv>
        );
      }
    );
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  useEffect(() => {
    const observers = [
      '#cameraPermissionsErrorApple',
      '#cameraPermissionsErrorAndroid',
    ].map((elementId: string) => {
      return replaceDom(
        elementId,
        <FullDiv>
          <Guide.CameraPermission />
        </FullDiv>
      );
    });
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);
}

const FullDiv = styled.div`
  position: fixed;
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${palette.$var.coolNeutral[5]};
`;

function replaceDom(querySelector: string, node: ReactNode) {
  const xr8container = document.querySelector(querySelector);
  let observer: MutationObserver | undefined;
  function renderComponent() {
    const container = document.querySelector(querySelector);
    if (container) {
      const wrapper = document.createElement('div');
      //@ts-expect-error ignore
      container.appendChild(wrapper);
      setTimeout(() => {
        const root = createRoot(wrapper);
        root.render(node);
      }, 100);
      observer?.disconnect();
    } else if (!observer) {
      observer = new MutationObserver(renderComponent);
      observer.observe(document.body, { childList: true });
    }
  }
  // dom 이미 있으면 즉시 실행 ()
  if (xr8container) {
    renderComponent();
  } else {
    // dom 확인 안되면 Observe
    observer = new MutationObserver(renderComponent);
    observer.observe(document.body, { childList: true });
  }
  return observer;
}
