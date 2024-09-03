import styled from 'styled-components';
import LottieData from '@/assets/video/success_lottie.json';
import Lottie from 'react-lottie';

const SuccessLottie = () => {
  const defaultOptions = {
    loop: true,
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
          height: '100px',
          overflow: 'hidden',
        }}
        isClickToPauseDisabled={true}
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
  width: 100%;
`;
