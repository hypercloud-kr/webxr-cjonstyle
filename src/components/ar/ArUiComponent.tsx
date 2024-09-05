import styled from '@emotion/styled';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { stateStore } from '@/ar/storage';
import { ArManager } from '@/ar/ArManager';
import { css } from '@emotion/react';
import scoreImg from '@/assets/imgs/score_star.png';
// import rightArrow from '@/assets/svg/rightArrow.svg';
import timerGreenImg from '@/assets/imgs/clock_green.png';
import timerRedImg from '@/assets/imgs/clock_red.png';
import SuccessLottie from '../ui/SuccessLottie';
import scoreEffect from '@/assets/video/scoreEffect.gif';
// import timeoutEffect from '@/assets/video/timeout.gif';

function ArUiComponent() {
  // const [time, setTime] = useState(2000);
  const [timerWidth, setTimerWidth] = useState(2000);
  // const [score, setScore] = useState(0);
  const [isStartingGame, setIsStartingGame] = useState(false);
  const [timeCount, setTimeCount] = useState('');
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isFinishingGame, setIsFinishingGame] = useState(false);
  const [timerImg, setTimerImg] = useState(timerGreenImg);
  const [timerSpeed, setTimerSpeed] = useState(0);
  const [isShowScoreEffect, setIsShowScoreEffect] = useState(false);
  const [score, setScore] = useState(0);
  const state = useSyncExternalStore(stateStore.subscribe, stateStore.getState);

  useEffect(() => {
    //   const id: any = setInterval(() => {
    //       setTime((t) => t - 1);
    //   }, 1000);
    //   setIntervalId(id);
    // setTimeout(() => {
    // }, 500)
    if (stateStore.getState().score > 0) {
      setIsShowScoreEffect(true);
      setTimeout(() => {
        setIsShowScoreEffect(false);
        setScore(stateStore.getState().score);
      }, 1000);
    }
  }, [stateStore.getState().score]);
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
            setTimerSpeed(1);
            startProgressBar(30000, () => {
              setIsFinishingGame(true);
              setTimeout(() => {
                stateStore.setGameState('end');
              }, 1000);
            });
          }, 1000);
          return 'START!';
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
      .items.filter(item => item.isCollected && item.isFinished).length;
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
      }, 1500);
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
        <TimerBarContainer>
          <TimerImg src={timerImg} speed={timerSpeed}></TimerImg>
          <TimerBar
            id="progress-bar"
            style={{ width: `${timerWidth}%` }}
            speed={timerSpeed}
          ></TimerBar>
        </TimerBarContainer>
        <ScoreContainer>
          <ScoreImg src={scoreImg}></ScoreImg>
          {/* <CountDiv>
            미션 성공<ColorSpan>X{stateStore.getState().count}</ColorSpan>
          </CountDiv>
          <VBar></VBar> */}
          {isShowScoreEffect && <ScoreEffect src={scoreEffect}></ScoreEffect>}
          <ScoreDiv>
            <ScoreSpan>SCORE</ScoreSpan>
            <ColorSpan>{score}</ColorSpan>
          </ScoreDiv>
        </ScoreContainer>
      </TopBar>
      <CardContainer>
        {isOpenSuccess && <SuccessLottie></SuccessLottie>}
        <Round>
          <RoundText
            key={stateStore.getState().count}
            count={stateStore.getState().count}
          >
            ROUND{stateStore.getState().count + 1}
          </RoundText>
        </Round>
        {stateStore.getState().items.map((item, i) => {
          // if (item.isCollected)
          return (
            <CardOuter key={i}>
              <CardInner flip={item.isCollected ? true : false}>
                <Card src={item.img}></Card>
                <Card src={item.backImg} flip={true}></Card>
              </CardInner>
            </CardOuter>
          );
        })}
        <MissionDiv>미션</MissionDiv>
      </CardContainer>
      {!isStartingGame && (
        <ImgWrapper>
          {/* <Img src={mainImg} alt="" /> */}
          <Button onClick={onClick}>
            <span>게임 시작하기</span>
            {/* <img src={rightArrow}></img> */}
          </Button>
        </ImgWrapper>
      )}
      {timeCount && (
        <TimeCountDivOutline key={`${timeCount}1`}>
          {timeCount}
        </TimeCountDivOutline>
      )}
      {timeCount && <TimeCountDiv key={timeCount}>{timeCount}</TimeCountDiv>}
      {isFinishingGame && (
        <TimeOutDiv>
          <TimeoutDivText>TIME OUT</TimeoutDivText>
        </TimeOutDiv>
      )}
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
  background: #ff0045;
  box-shadow: 0 -3px 0 rgba(211, 57, 69, 1) inset;

  ${props =>
    props.speed >= 2 &&
    css`
      border-radius: 999px;
      background: #da10f8;
      box-shadow: 0px -3px 0px 0px #a300bd inset;
    `};
`;

const ScoreContainer = styled.div`
  /* flex: 1; */
  width: 101px;
  display: flex;
  position: relative;
  border-radius: 13px;
  background-color: white;
  border: 2px solid #c4cbd7;
  height: 24px;
  justify-content: center;
  box-sizing: content-box;
  /* width: 50%; */
  /* justify-content: space-between;
  padding: 0px 20px; */
`;

const TimerImg = styled.img`
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
    `}
  ${props =>
    props.speed === 3 &&
    css`
      animation: rotateTimer 0.5s infinite;
    `}
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
const ScoreImg = styled.img`
  position: absolute;
  width: 58px;
  height: 58px;
  top: -22px;
  left: -35px;
  align-items: center;
  justify-content: center;
`;
const ScoreEffect = styled.img`
  position: absolute;
  top: -22px;
  width: 60px;
  height: 60px;
  /* top: -37px;
  width: 100px;
  height: 100px; */
`;
// const CountDiv = styled.div`
//   /* position: fixed;
//   top: 20px;
//   left: 20px; */
//   z-index: 50;
//   color: black;
//   flex: 0 0 50%;
//   display: flex;
//   justify-content: center;

//   color: var(--Cool-Neutral-5, #1d1e21);
//   text-shadow: 0px 0.884px 0px rgba(0, 0, 0, 0.15);
//   font-family: 'Cafe24 Ssurround OTF';
//   font-size: 10.607px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 12.375px; /* 116.667% */
//   letter-spacing: 0.212px;
//   text-transform: uppercase;
//   align-items: center;
// `;
const ScoreSpan = styled.span`
  padding-top: 2px;
`;
const ColorSpan = styled.span`
  padding: 0 7px;
  color: #7515d8;
  font-size: 20px;
`;

// const VBar = styled.div`
//   position: absolute;
//   left: 50%;
//   top: 5px;
//   width: 1px;
//   height: 12px;
//   background-color: transparent;
//   border-left: 2px solid #646878;
//   border-radius: 1px;
//   display: inline-flex;
// `;

const ScoreDiv = styled.div`
  /* position: fixed;
  top: 20px;
  left: 40px; */
  z-index: 50;
  color: black;
  /* flex: 0 0 50%; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #252525;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 12.375px; /* 116.667% */
  letter-spacing: 0.212px;
  text-transform: uppercase;
  padding-left: 15px;
`;

// const SuccessDiv = styled.div`
//   position: fixed;
//   top: 70px;
//   left: 0;
//   width: 100%;
//   z-index: 60;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const CardContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  width: calc(100% - 40px);
  margin: 0 20px;
  padding: 0 29px;
  height: 108px;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  /* border: 1px solid var(--Cool-Neutral-60, #8D929F); */
  background: #6e15ce;
  box-shadow: 0px 4px 0px 0px #3f0892;
`;
const Round = styled.div`
  position: absolute;
  top: -20px;
  width: 158px;
  height: 39px;

  border-radius: 10px;
  /* border: 1px solid var(--Cool-Neutral-60, #8D929F); */
  background: #fff;

  background: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #6e15ce;
`;
const RoundText = styled.div`
  color: #14fea2;
  text-align: center;
  font-family: Pretendard;
  font-size: 27px;
  font-style: normal;
  font-weight: 800;
  line-height: 31.511px; /* 116.707% */
  text-transform: uppercase;

  position: absolute;
  top: 7px;
  ${props =>
    props.count >= 1 &&
    css`
      animation: bottomToTop 0.5s;
    `}
  ${css`
    @keyframes bottomToTop {
      0% {
        top: 1000px;
      }
      80% {
        top: -70px;
      }
      100% {
        top: 7px;
      }
    }
  `}
`;
const CardOuter = styled.div`
  flex: 0 0 20%;
  /* width: 100px; */
  height: 60px;
  perspective: 600px;
  margin-top: 8px;
  display: flex;
  justify-content: center;
`;
const CardInner = styled.div`
  max-width: 60px;
  display: flex;
  justify-content: center;
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
const MissionDiv = styled.div`
  position: absolute;
  bottom: -23px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 19.78px;
  flex-shrink: 0;

  border-radius: 0px 0px 30px 30px;
  background: #14fea2;
  box-shadow: 0px 2px 0px #3f0892;

  color: #3f0892;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 14.032px; /* 116.935% */
  letter-spacing: 0.24px;
  text-transform: uppercase;
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
  animation: switch 3s linear;
  color: #14fea2;
  text-shadow: 0 8px 0 rgba(63, 8, 146, 1); /* Shadow from feOffset dy="8" */
  font-size: 50px;
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
