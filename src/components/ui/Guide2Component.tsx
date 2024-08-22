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
      선물박스를 놓을 평평한 바닥을 찾아 탭하세요!
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
