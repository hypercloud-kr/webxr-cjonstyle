import styled from '@emotion/styled';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { stateStore } from '@/ar/storage';
import { ArManager } from '@/ar/ArManager';
import { css } from '@emotion/react';

function ArUiComponent() {
  //   const [time, setTime] = useState(2000);
  const [timerWidth, setTimerWidth] = useState(2000);
  // const [score, setScore] = useState(0);
  const [isStartingGame, setIsStartingGame] = useState(false);
  const [timeCount, setTimeCount] = useState(null);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isFinishingGame, setIsFinishingGame] = useState(false);
  const state = useSyncExternalStore(stateStore.subscribe, stateStore.getState);

  useEffect(() => {
    //   const id: any = setInterval(() => {
    //       setTime((t) => t - 1);
    //   }, 1000);
    //   setIntervalId(id);
    // setTimeout(() => {
    // }, 500)
  }, []);
  const onClick = () => {
    setIsStartingGame(true);
    if (!timeCount) setTimeCount(3);
    const intervalId = setInterval(() => {
      setTimeCount(count => {
        if (count === 1) {
          clearInterval(intervalId);
          setTimeout(() => {
            ArManager.instance.mainScene.children[0].children.forEach(child => {
              if (child.runAnimationOpen) child.runAnimationOpen();
            });
            setTimeCount(null);
            startProgressBar(300000, () => {
              setIsFinishingGame(true);
              setTimeout(() => {
                stateStore.setGameState('end');
              }, 1000);
            });
          }, 1000);
          return '시작!';
        }
        return count - 1;
      });
    }, 1000);
    // const intervalId = setInterval(() => {
    //   if (timeCount === 1) {
    //     console.log('?');
    //     setTimeCount('시작!');
    //     clearInterval(intervalId);
    //     setTimeout(() => {
    //       setTimeCount(null);
    //     }, 500);
    //   } else {
    //     setTimeCount(timeCount => timeCount - 1);
    //   }
    // }, 1000)
  };

  //   useEffect(() => {
  //     if (time <= 0) {
  //         clearInterval(intervalId);
  //         setTimeout(() => {
  //             stateStore.setGameState('end');
  //         }, 1000);
  //     }
  //   }, [time]);

  useEffect(() => {
    const length = stateStore
      .getState()
      .items.filter(item => item.isCollected).length;
    // setScore(
    //   stateStore.getState().items.filter(item => item.isCollected).length
    // );
    // console.log('sfafddfadfasff', length);

    if (length === 5) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        setIsOpenSuccess(false);
        stateStore.initItems();
        stateStore.sufflePosition();
        //이후에 mainObject의 callbackfinishanimation함수 안에 mainGroup position set필요
      }, 1000);
    }
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
      if (stateStore.getState().gameState === 'end') {
        return;
      }
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
      <TopBar>
        <TimerBarContainer>
          <TimerBar
            id="progress-bar"
            style={{ width: `${timerWidth}%` }}
          ></TimerBar>
        </TimerBarContainer>
        <ScoreContainer>
          <CountDiv>{stateStore.getState().count}</CountDiv>
          <ScoreDiv>{stateStore.getState().score}</ScoreDiv>
        </ScoreContainer>
      </TopBar>
      {isOpenSuccess && <SuccessDiv>Success</SuccessDiv>}
      <CardContainer>
        <Round>{stateStore.getState().count}</Round>
        {stateStore.getState().items.map(item => {
          // if (item.isCollected)
          return (
            <CardOuter>
              <CardInner flip={item.isCollected ? true : false}>
                <Card src={item.img}></Card>
                <Card src={item.backImg} flip={true}></Card>
              </CardInner>
            </CardOuter>
          );
        })}
      </CardContainer>
      {!isStartingGame && (
        <ImgWrapper>
          {/* <Img src={mainImg} alt="" /> */}
          <Button onClick={onClick}>게임 시작하기</Button>
        </ImgWrapper>
      )}
      {timeCount && <TimeCountDiv key={timeCount}>{timeCount}</TimeCountDiv>}
      {isFinishingGame && <TimeOutDiv>Time out</TimeOutDiv>}
    </>
  );
}

export default ArUiComponent;

const TopBar = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  display: flex;
  z-index: 50;
  width: 100%;
`;
const TimerBarContainer = styled.div`
  /* position: fixed;
  left: 0;
  top: 20px;
  z-index: 50;*/
  width: 50%;
  background-color: #e0e0e0; /* 배경 색상 */
  border-radius: 25px; /* 둥근 모서리 */
  overflow: hidden; /* 내용이 넘치지 않게 하기 */
  height: 30px; /* 높이 */
  /* position: relative; */
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;

const TimerBar = styled.div`
  height: 100%;
  width: 0%;
  background-color: #76c7c0; /* 진행 바 색상 */
  border-radius: 25px 0 0 25px;
  /* transition: width 0.4s ease; 부드러운 진행 애니메이션 */
`;

const ScoreContainer = styled.div`
  display: flex;
  width: 50%;
  /* justify-content: space-between;
  padding: 0px 20px; */
`;

const CountDiv = styled.div`
  /* position: fixed;
  top: 20px;
  left: 20px; */
  z-index: 50;
`;

const ScoreDiv = styled.div`
  /* position: fixed;
  top: 20px;
  left: 40px; */
  z-index: 50;
`;

const SuccessDiv = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  z-index: 60;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Round = styled.div`
  position: absolute;
  top: -30px;
  width: 50px;
  height: 30px;
  background: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CardOuter = styled.div`
  width: 100px;
  height: 100px;
  perspective: 600px;
`;
const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  ${props =>
    props.flip &&
    css`
      transform: rotateY(180deg);
    `}
`;
const Card = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  flex: 0 0 auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden; /* 뒷면이 보이지 않도록 */
  overflow: hidden;

  ${props =>
    props.flip &&
    css`
      transform: rotateY(180deg);
    `}
`;
const ImgWrapper = styled.div`
  display: inline-flex;
  position: fixed;
  left: 0;
  bottom: 20px;
  width: 100%;
  z-index: 50;
  margin-bottom: 4px;
  padding: 0px 20px;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  color: var(--white, var(--common-100, #fff));
  text-align: center;
  font: var(--display01-b);
  line-height: 142%;
`;

const Button = styled.button`
  display: flex;
  bottom: 24px;
  width: calc(100% - 40px);
  padding: 16px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 50;

  border-radius: 16px;
  background: var(--blue-60, #3285fa);

  text-align: center;
  border-width: 0px;
  color: var(--common-100, #fff);
`;

const TimeCountDiv = styled.div`
  position: fixed;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  bottom: 30px;
  z-index: 50;
  left: 0;
  width: 100%;
  animation: grow 0.5s;
  transform: scale(2);
  ${css`
    /* transform: scale(2); */
    @keyframes grow {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(2);
      }
    }
  `}
`;

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
