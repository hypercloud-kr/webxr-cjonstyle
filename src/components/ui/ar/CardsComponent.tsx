import { css } from '@emotion/react';
import styled from '@emotion/styled';
import SuccessLottie from '../../ui/SuccessLottie';
import { stateStore } from '@/ar/storage';
import rightArrow from '@/assets/svg/img_arrow.svg';
import { Fragment } from 'react';

type CardsComponentProps = {
  isOpenSuccess: boolean;
  successCallback: () => void;
};

const CardsComponent = ({
  isOpenSuccess,
  successCallback,
}: CardsComponentProps) => {
  return (
    <CardContainer>
      {isOpenSuccess && (
        <SuccessLottie successCallback={successCallback}></SuccessLottie>
      )}
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
          <Fragment key={i}>
            <CardOuter key={i}>
              <CardInner flip={item.isCollected ? true : false}>
                <Card src={item.img}></Card>
                <Card src={item.backImg} flip={true}></Card>
              </CardInner>
            </CardOuter>
            {i === 4 ? null : (
              <RightArrow key={`arrow${i}`} src={rightArrow}></RightArrow>
            )}
          </Fragment>
        );
      })}
      <MissionDiv>미션</MissionDiv>
    </CardContainer>
  );
};
export default CardsComponent;

const CardContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  width: calc(100% - 40px);
  margin: 0 20px;
  padding: 8px 9px 0 9px;
  height: 108px;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
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
  flex: 1;
  /* width: 100px; */
  height: 60px;
  perspective: 600px;
  display: flex;
  justify-content: center;
  gap: 9px;
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

const RightArrow = styled.img``;

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
