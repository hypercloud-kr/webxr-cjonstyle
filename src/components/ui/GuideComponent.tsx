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
      최대한 많은 미션판을 완성하라!
      <ImgWrapper>
        <Button onClick={onClick}>시작하기</Button>
      </ImgWrapper>
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

const ImgWrapper = styled.div`
  display: inline-flex;
  margin-top: 111px;
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
