import styled from '@emotion/styled';

type ScoreBarComponentProps = {
  scoreImg: string;
  isShowScoreEffect: boolean;
  scoreEffect: string;
  score: number;
};

const ScoreBarComponent = ({
  scoreImg,
  isShowScoreEffect,
  scoreEffect,
  score,
}: ScoreBarComponentProps) => {
  return (
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
  );
};
export default ScoreBarComponent;

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
  top: -18px;
  right: -10px;
  width: 60px;
  height: 60px;
  /* top: -37px;
  width: 100px;
  height: 100px; */
`;

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
