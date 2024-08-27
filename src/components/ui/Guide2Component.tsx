import styled from 'styled-components';
// import mainImg from '/@assets/img/img_tit-logo.svg';
import backgroundImg from '@/assets/imgs/background.jpg';
// import { typography } from '@hypercloud-kr/styling-kit';
// import { stateStore } from '@/ar/storage';
// import { ArManager } from '@/ar/ArManager';

// const body700 = typography.body02[700];

const Guide2Component = () => {
  return (
    <StartingWrapper>
      <BoxContainer>
        <img></img>
        <div>선물박스를 놓을 평평한 바닥을 찾아 탭하세요!</div>
      </BoxContainer>
      <Tap>탭</Tap>
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
  display: flex;
  /* margin: 0 5%; */
  margin-top: 31px;
  width: 300px;
  height: 200px;
  background-color: white;
  border: 1px solid;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  /* gap: 24px; */

  /* color: var(--white, var(--common-100, #fff)); */
  color: black;
  text-align: center;
  /* font: var(--display01-b); */
  line-height: 142%;
`;

const Tap = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
`;
