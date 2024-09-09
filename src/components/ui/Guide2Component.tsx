import styled from 'styled-components';
// import mainImg from '/@assets/img/img_tit-logo.svg';
import backgroundImg from '@/assets/imgs/background.jpg';
// import { typography } from '@hypercloud-kr/styling-kit';
// import { stateStore } from '@/ar/storage';
import boxOpenImg from '@/assets/imgs/img_popup.png';
import handGestureImg from '@/assets/imgs/img_hand gesture.png';
import tapImg from '@/assets/imgs/img_Tap.png';

// const body700 = typography.body02[700];

const Guide2Component = () => {
  return (
    <StartingWrapper>
      <BoxContainer>
        <BoxImg src={boxOpenImg}></BoxImg>
        <BoxText>
          <div>선물박스를 놓을</div>
          <div>바닥을 찾아 탭하세요!</div>
        </BoxText>
      </BoxContainer>
      <Tap>
        <img src={handGestureImg}></img>
        <TapImg src={tapImg}></TapImg>
      </Tap>
    </StartingWrapper>
  );
};
export default Guide2Component;

const StartingWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* background: 
        rgb(211,211,211)
        url(${backgroundImg})
        0 0px / 100% 100%
        no-repeat; */
  /* background: rgb(211, 211, 211) url(/backgroundImg.png) 0 0px; */
  object-fit: cover;
  background-position: center;
  background-size: cover;
`;

const BoxContainer = styled.div`
  margin-top: 43px;
  align-items: center;

  display: flex;
  width: 350px;
  height: 108px;
  padding: 10px 31px 10px 10px;
  align-items: center;
  gap: 34px;
  flex-shrink: 0;

  border-radius: 13px;
  background: #fff;
  box-shadow: 0px 4px 0px 0px #3f0892;
`;

const BoxImg = styled.img`
  width: 123px;
  height: 94.566px;
`;

const BoxText = styled.div`
  color: #6e15ce;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
  text-transform: uppercase;
`;

// const HighLightText = styled.span`
//   color: #4feeab;
//   font-family: 'Cafe24 Ssurround OTF';
//   font-size: 18px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 27px;
//   text-transform: uppercase;
// `;
const Tap = styled.div`
  position: fixed;
  right: 63px;
  bottom: 132px;
`;

const TapImg = styled.img`
  position: absolute;
  right: 0;
`;
