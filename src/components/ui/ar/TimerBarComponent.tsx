import { css } from '@emotion/react';
import styled from '@emotion/styled';

type TimerBarComponentProps = {
  timerImg: string;
  timerSpeed: number;
  timerWidth: number;
};

const TimerBarComponent = ({
  timerImg,
  timerSpeed,
  timerWidth,
}: TimerBarComponentProps) => {
  return (
    <TimerBarContainer>
      <TimerImg src={timerImg} speed={timerSpeed}></TimerImg>
      <TimerBar
        id="progress-bar"
        style={{ width: `${timerWidth}%` }}
        speed={timerSpeed}
      ></TimerBar>
    </TimerBarContainer>
  );
};
export default TimerBarComponent;

const TimerBarContainer = styled.div`
  flex: 0 0 50%;
  background-color: #e0e0e0; /* 배경 색상 */
  border-radius: 25px; /* 둥근 모서리 */
  overflow: hidden; /* 내용이 넘치지 않게 하기 */
  height: 24px; /* 높이 */
  /* position: relative; */
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);

  border-radius: 999px;
  border: var(--Size-base-size_xxxs, 2px) solid var(--Cool-Neutral-90, #c4cbd7);
  background: var(--Common-100, #fff);
  box-sizing: content-box;
`;

const TimerBar = styled.div`
  height: 100%;
  width: 0%;
  background-color: #76c7c0; /* 진행 바 색상 */
  border-radius: 25px 0 0 25px;
  /* transition: width 0.4s ease; 부드러운 진행 애니메이션 */
  border-radius: 78px;
  background: #7515d8;
  box-shadow: 0px -3px 0px 0px #3f0892 inset;

  ${props =>
    props.speed >= 2 &&
    css`
      border-radius: 999px;
      background: #ff0045;
      box-shadow: 0px -3px 0px 0px #d30039 inset;
    `};
`;

const TimerImg = styled.img<{ speed?: number }>`
  position: absolute;
  width: 58px;
  height: 58px;
  top: 8px;
  left: 6px;
  align-items: center;
  justify-content: center;
  ${props =>
    props.speed === 1 &&
    css`
      animation: rotateTimer 1.5s infinite;
    `};
  ${props =>
    props.speed === 2 &&
    css`
      animation: rotateTimer 0.75s infinite;
    `};
  ${props =>
    props.speed === 3 &&
    css`
      animation: rotateTimer 0.5s infinite;
    `};
  ${css`
    @keyframes rotateTimer {
      0% {
        transform: rotate(0);
      }
      25% {
        transform: rotate(15deg);
      }
      75% {
        transform: rotate(-15deg);
      }
      100% {
        transform: rotate(0);
      }
    }
  `}
`;
