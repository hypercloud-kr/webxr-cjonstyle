import styled from '@emotion/styled';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { stateStore } from '@/ar/storage';

function ArUiComponent() {
  //   const [time, setTime] = useState(2000);
  const [timerWidth, setTimerWidth] = useState(2000);
  const [score, setScore] = useState(0);

  const state = useSyncExternalStore(stateStore.subscribe, stateStore.getState);

  useEffect(() => {
    //   const id: any = setInterval(() => {
    //       setTime((t) => t - 1);
    //   }, 1000);
    //   setIntervalId(id);

    // setTimeout(() => {
    startProgressBar(20000, () => {
      alert('타이머가 종료되었습니다!');
      stateStore.setGameState('end');
    });

    // }, 500)
  }, []);

  //   useEffect(() => {
  //     if (time <= 0) {
  //         clearInterval(intervalId);
  //         setTimeout(() => {
  //             stateStore.setGameState('end');
  //         }, 1000);
  //     }
  //   }, [time]);

  useEffect(() => {
    setScore(
      stateStore.getState().items.filter(item => item.isCollected).length
    );
  }, [state.items]);

  function startProgressBar(duration, callback) {
    // const progressBar = document.querySelector('#progress-bar');
    let startTime = null;

    function animateProgressBar(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progressPercentage = Math.max(
        (1 - elapsedTime / duration) * 100,
        0
      );
      setTimerWidth(progressPercentage);
      //   progressBar.style.width = progressPercentage + '%';

      if (elapsedTime < duration) {
        requestAnimationFrame(animateProgressBar);
      } else if (callback) {
        callback();
      }
    }

    requestAnimationFrame(animateProgressBar);
  }

  return (
    <>
      <TimerBarContainer>
        <TimerBar
          id="progress-bar"
          style={{ width: `${timerWidth}%` }}
        ></TimerBar>
      </TimerBarContainer>
      <ScoreDiv>{score}</ScoreDiv>
      <CardContainer>
        {stateStore.getState().items.map(item => {
          return <div>{item.name};</div>;
        })}
      </CardContainer>
    </>
  );
}

export default ArUiComponent;

const TimerBarContainer = styled.div`
  position: fixed;
  top: 20px;
  z-index: 50;
  width: 100%;
  background-color: #e0e0e0; /* 배경 색상 */
  border-radius: 25px; /* 둥근 모서리 */
  overflow: hidden; /* 내용이 넘치지 않게 하기 */
  height: 30px; /* 높이 */
  position: relative;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;

const TimerBar = styled.div`
  height: 100%;
  width: 0%;
  background-color: #76c7c0; /* 진행 바 색상 */
  border-radius: 25px 0 0 25px;
  /* transition: width 0.4s ease; 부드러운 진행 애니메이션 */
`;

const ScoreDiv = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 50;
`;

const CardContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;
