import styled, { keyframes } from 'styled-components';
import loadingImg from '@/assets/imgs/loading.png';

interface LoadingPanelProps {
  backgroundColor?: string;
}

const LoadingPanel = ({ backgroundColor }: LoadingPanelProps) => {
  return (
    <LoadingWrapper background={backgroundColor}>
      <LoadingDiv>
        <LoadingImg src={loadingImg} alt="vr img" />
      </LoadingDiv>
    </LoadingWrapper>
  );
};

export default LoadingPanel;

const rotateAnimation = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const LoadingWrapper = styled.div<{ background?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background: ${(props) => props.background};
`;

const LoadingDiv = styled.div`
  width: 80px;
  height: 80px;
  animation: ${rotateAnimation} 2s linear infinite;
`;

const LoadingImg = styled.img`
  width: 100%;
  height: 100%;
`;
