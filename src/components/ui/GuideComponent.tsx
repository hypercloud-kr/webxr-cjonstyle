import styled from 'styled-components';
// import mainImg from '/@assets/img/img_tit-logo.svg';
import backgroundImg from '@/assets/imgs/background.jpg';
import { typography } from '@hypercloud-kr/styling-kit';
import { ArManager } from '@/ar/ArManager';

const body700 = typography.body02[700];

const GuideComponent = ({ setIsOpenGuide, setIsOpenGuide2 }) => {
  const onClick = () => {
    setIsOpenGuide(false);
    setIsOpenGuide2(true);
    // stateStore.setGameState('running');
    ArManager.initGroup(setIsOpenGuide2);
  };
  return (
    <StartingWrapper>
      <BoxContainer>
        <span>최대한 많은</span>
        <span>미션판을 완성하라!</span>
        <div>
          이미지
          <img></img>
        </div>
        <span>제시 상품을 순서대로 맞추면 미션 1개 성공!</span>
        <Button onClick={onClick}>확인</Button>
      </BoxContainer>
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

const BoxContainer = styled.div`
  display: flex;
  margin: 0 5%;
  margin-top: 111px;
  width: 90%;
  height: 300px;
  background-color: white;
  border: 1px solid;
  padding: 0px 20px;
  flex-direction: column;
  align-items: center;
  /* gap: 24px; */

  /* color: var(--white, var(--common-100, #fff)); */
  color: black;
  text-align: center;
  /* font: var(--display01-b); */
  line-height: 142%;
`;

const Button = styled.button`
  position: fixed;
  display: flex;
  bottom: 24px;
  width: calc(100% - 40px);
  padding: 16px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 16px;
  background: var(--blue-60, #3285fa);

  text-align: center;
  border-width: 0px;
  color: var(--common-100, #fff);
  font: ${body700};
  /* Body_01/700 */
`;
