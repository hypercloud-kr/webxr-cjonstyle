import styled from '@emotion/styled';
import LoadingLottie from '@/assets/video/loading.json';
import Lottie from 'react-lottie';

export const ARLoadingComponent = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
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
          width: '70px',
          height: '70px',
          overflow: 'hidden',
        }}
        isClickToPauseDisabled={true}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 51;
  width: 100%;
  height: 100%;
  top: -20px;
`;
