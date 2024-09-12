import { css } from '@emotion/react';
import styled from '@emotion/styled';

type TimerComponentProps = {
  timeCount: string | number | undefined;
};

const TimerComponent = ({ timeCount }: TimerComponentProps) => {
  return (
    <>
      {timeCount && (
        <>
          <TimeCountDivOutline key={`${timeCount}1`}>
            {timeCount}
          </TimeCountDivOutline>
          <TimeCountDiv key={timeCount}>{timeCount}</TimeCountDiv>
        </>
      )}
    </>
  );
};
export default TimerComponent;
const TimeCountDivOutline = styled.div`
  position: fixed;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  bottom: 68px;
  z-index: 50;
  left: 0;
  width: 100%;
  animation: grow2 0.5s;
  transform: scale(1);

  color: #fff;
  text-align: center;
  text-shadow: 0px 4px 0px #3f0892;
  -webkit-text-stroke-width: 17px;
  -webkit-text-stroke-color: #6e15ce;
  font-family: Pretendard;
  font-size: 80px;
  font-style: normal;
  font-weight: 900;
  line-height: 124.956px; /* 156.195% */
  letter-spacing: 1.6px;
  text-transform: uppercase;
  /* 
  background: linear-gradient(180deg, #fff 23.98%, #4feeab 48.23%, #fff 72.78%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */

  ${css`
    /* transform: scale(2); */
    @keyframes grow2 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
  `}
`;
const TimeCountDiv = styled.div`
  position: fixed;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  bottom: 68px;
  z-index: 50;
  left: 0;
  width: 100%;
  animation: grow 0.5s;
  transform: scale(1);

  color: #fff;
  text-align: center;
  text-shadow: 0px 4px 0px #3f0892;
  -webkit-text-stroke-color: #6e15ce;
  font-family: Pretendard;
  font-size: 80px;
  font-style: normal;
  font-weight: 900;
  line-height: 124.956px; /* 156.195% */
  letter-spacing: 1.6px;
  text-transform: uppercase;
  /* 
  background: linear-gradient(180deg, #fff 23.98%, #4feeab 48.23%, #fff 72.78%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */

  ${css`
    /* transform: scale(2); */
    @keyframes grow {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
  `}
`;
