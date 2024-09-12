import styled from '@emotion/styled';
import { RefObject, useEffect, useRef } from 'react';
import { stateStore } from '@/ar/storage';

type TimeOutComponentProps = {
  isFinishingGame: boolean;
};

const TimeOutComponent = ({ isFinishingGame }: TimeOutComponentProps) => {
  const timeoutRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      timeoutRef.current.addEventListener('animationend', () => {
        stateStore.setGameState('end');
      });
    }
  }, [isFinishingGame]);

  return (
    <>
      {isFinishingGame && (
        <TimeOutDiv>
          <TimeoutDivText ref={timeoutRef}>TIME OUT</TimeoutDivText>
        </TimeOutDiv>
      )}
    </>
  );
};
export default TimeOutComponent;

const TimeOutDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: inline-flex;
  z-index: 50;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const TimeoutDivText = styled.div`
  font-family: yoon-a-yoonche, sans-serif;
  animation: switch 2s linear;
  color: #14fea2;
  text-shadow: 0 8px 0 rgba(63, 8, 146, 1); /* Shadow from feOffset dy="8" */
  font-size: 70px;
  @keyframes switch {
    0% {
      opacity: 0;
      filter: blur(20px);
      transform: scale(12);
    }
    33% {
      opacity: 1;
      filter: blur(0);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      filter: blur(0);
      transform: scale(0.9);
    }
    73% {
      opacity: 0;
      filter: blur(10px);
      transform: scale(0.1);
    }
    100% {
      opacity: 0;
    }
  }
`;
