import styled from 'styled-components';
// import mainImg from '/@assets/img/img_tit-logo.svg';
import backgroundImg from '@/assets/imgs/background.jpg';
// import { typography } from '@hypercloud-kr/styling-kit';
import { ArManager } from '@/ar/ArManager';
import guideImg from '@/assets/imgs/img_game guide.png';

// const body700 = typography.body02[700];

const GuideComponent = ({ setIsOpenGuide, setIsOpenGuide2 }) => {
  const onClick = () => {
    setIsOpenGuide(false);
    setIsOpenGuide2(true);
    // stateStore.setGameState('running');
    ArManager.initGroup(setIsOpenGuide2);
  };
  return (
    <StartingWrapper>
      {/* <BoxContainer> */}
      <BackgroundStyle></BackgroundStyle>
      <GuideImg src={guideImg}></GuideImg>
      {/* <span>최대한 많은</span>
        <span>미션판을 완성하라!</span>
        <div>
          이미지
          <img></img>
        </div>
        <span>제시 상품을 순서대로 맞추면 미션 1개 성공!</span> */}
      <Button onClick={onClick}>확인</Button>
      {/* </BoxContainer> */}
    </StartingWrapper>
  );
};
export default GuideComponent;

const StartingWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 51;
  flex-direction: column;
  /* background: 
        rgb(211,211,211)
        url(${backgroundImg})
        0 0px / 100% 100%
        no-repeat; */
  /* background: rgb(211, 211, 211) url(/backgroundImg.png) 0 0px; */
  object-fit: cover;
  background-position: center;
  background-size: cover;
  justify-content: space-between;
  align-items: center;
  padding: 47px 0px 27px 0px;
`;

// const BoxContainer = styled.div`
//   display: flex;
//   margin: 0 5%;
//   margin-top: 111px;
//   width: 90%;
//   height: 300px;
//   background-color: white;
//   border: 1px solid;
//   padding: 0px 20px;
//   flex-direction: column;
//   align-items: center;
//   /* gap: 24px; */

//   /* color: var(--white, var(--common-100, #fff)); */
//   color: black;
//   text-align: center;
//   /* font: var(--display01-b); */
//   line-height: 142%;
// `;
const BackgroundStyle = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background: var(--Neutral-_0, #000);
`;
const GuideImg = styled.img`
  width: 350px;
  height: 486px;
  z-index: 52;
  @media (max-height: 650px) {
    width: auto;
    height: 400px;
  }
`;
const Button = styled.button`
  position: fixed;
  display: flex;
  bottom: 74px;
  width: calc(100% - 60px);
  padding: 16px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background: #7515d8;

  color: var(--Common-100, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
  letter-spacing: -0.2px;

  border-width: 0;
`;
