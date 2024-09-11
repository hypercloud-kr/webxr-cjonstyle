import styled from 'styled-components';
import LottieData from '@/assets/video/success_lottie.json';
import Lottie from 'react-lottie';

const SuccessLottie = ({ successCallback }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Wrapper>
      <Lottie
        options={defaultOptions}
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
        isClickToPauseDisabled={true}
        eventListeners={[
          {
            eventName: 'complete',
            callback: () => {
              successCallback();
            },
          },
        ]}
      />
    </Wrapper>
  );
};

export default SuccessLottie;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 51;
  width: 100vw;
  height: 132px;
  top: -34px;
`;
