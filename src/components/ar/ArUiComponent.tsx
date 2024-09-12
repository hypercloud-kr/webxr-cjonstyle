import styled from '@emotion/styled';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { stateStore } from '@/ar/storage';
import { ArManager } from '@/ar/ArManager';
import scoreImg from '@/assets/imgs/score_star.png';
import timerGreenImg from '@/assets/imgs/clock_green.png';
import timerRedImg from '@/assets/imgs/clock_red.png';
import scoreEffect from '@/assets/video/scoreEffect.gif';
import { MainGroup } from '@/ar/objects/MainGroup';
import TimerBarComponent from '../ui/ar/TimerBarComponent';
import ScoreBarComponent from '../ui/ar/ScoreBarComponent';
import CardsComponent from '../ui/ar/CardsComponent';
import TimerComponent from '../ui/ar/TimerComponent';
import TimeOutComponent from '../ui/ar/TimeoutComponent';

function ArUiComponent() {
  const [timerWidth, setTimerWidth] = useState(2000);
  const [isStartingGame, setIsStartingGame] = useState(false);
  const [timeCount, setTimeCount] = useState<number | string | undefined>();
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isFinishingGame, setIsFinishingGame] = useState(false);
  const [timerImg, setTimerImg] = useState(timerGreenImg);
  const [timerSpeed, setTimerSpeed] = useState(0);
  const [isShowScoreEffect, setIsShowScoreEffect] = useState(false);
  const [score, setScore] = useState(0);
  const state = useSyncExternalStore(stateStore.subscribe, stateStore.getState);

  useEffect(() => {
    if (stateStore.getState().score > 0) {
      setIsShowScoreEffect(true);
      setTimeout(() => {
        setIsShowScoreEffect(false);
        setScore(stateStore.getState().score);
      }, 1000);
    }
  }, [stateStore.getState().score]);

  useEffect(() => {
    if (
      stateStore
        .getState()
        .items.every(item => item.isCollected && item.isFinished)
    ) {
      setIsOpenSuccess(true);
      stateStore.setCount();
      stateStore.setScore();
    }
  }, [state.items]);

  const onClick = () => {
    setIsStartingGame(true);
    if (!timeCount) setTimeCount(3);
    const intervalId = setInterval(() => {
      setTimeCount(count => {
        if (count === 1) {
          clearInterval(intervalId);
          setTimeout(() => {
            const mainGroup =
              ArManager.instance.mainScene.findNodeById('mainGroup');
            mainGroup.children.forEach(child => {
              if (child.name === 'mainObject') child.runAnimationOpen();
            });
            setTimeCount(undefined);
            setTimerSpeed(1);
            startProgressBar(30000, () => {
              setIsFinishingGame(true);
            });
          }, 1000);
          return 'START!';
        }
        return count - 1;
      });
    }, 1000);
  };

  const successCallback = () => {
    setIsOpenSuccess(false);
    stateStore.initItems();
    stateStore.sufflePosition();
    const mainGroup = ArManager.instance.mainScene.findNodeById(
      'mainGroup'
    ) as MainGroup;
    mainGroup.repositionChildObjects();
  };

  function startProgressBar(duration, callback) {
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

      if (duration - elapsedTime < 3000) {
        setTimerSpeed(3);
      } else if (duration - elapsedTime < 10000) {
        setTimerImg(timerRedImg);
        setTimerSpeed(2);
      }

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
        <TimerBarComponent
          timerImg={timerImg}
          timerSpeed={timerSpeed}
          timerWidth={timerWidth}
        ></TimerBarComponent>
        <ScoreBarComponent
          scoreImg={scoreImg}
          isShowScoreEffect={isShowScoreEffect}
          scoreEffect={scoreEffect}
          score={score}
        />
      </TopBar>
      <CardsComponent
        isOpenSuccess={isOpenSuccess}
        successCallback={successCallback}
      />
      {!isStartingGame && (
        <ImgWrapper>
          <Button onClick={onClick}>
            <span>게임 시작하기</span>
          </Button>
        </ImgWrapper>
      )}
      <TimerComponent timeCount={timeCount} />
      <TimeOutComponent isFinishingGame={isFinishingGame} />
    </>
  );
}

export default ArUiComponent;

const TopBar = styled.div`
  position: fixed;
  /* top: 28px; */
  left: 0;
  display: flex;
  z-index: 50;
  width: 100%;
  align-items: center;
  padding: 28px 21px 21px 41px;
  justify-content: space-between;
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
  bottom: 57px;
  /* width: calc(100% - 40px); */
  width: 297px;
  height: 50px;

  padding: 16px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 50;

  border-radius: 8px;
  background: #6e15ce;
  border: var(--Size-base-size_xxxs, 2px) solid 6e15CE;
  /* box-shadow: 0px 10px 0px 0px #640faf; // rgba(0, 0, 0, 0.20); */

  color: var(--Common-100, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
  letter-spacing: -0.2px;
`;
