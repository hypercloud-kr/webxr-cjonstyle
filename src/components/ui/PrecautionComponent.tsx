import styled from 'styled-components';
// import mainImg from '/@assets/img/img_tit-logo.svg';
import backgroundImg from '@/assets/imgs/background.jpg';
import { typography } from '@hypercloud-kr/styling-kit';
import { stateStore } from '@/ar/storage';

const body700 = typography.body02[700];

const PrecautionsComponent = () => {
  const onClick = () => {
    stateStore.setGameState('running');
  };
  return (
    <StartingWrapper>
      <PrecautionTitle>유의사항</PrecautionTitle>
      <ImgWrapper>
        <ul>
          <li>Chrom, Safari 브라우저 사용을 권장합니다.</li>
          <li>
            네트워크 환경에 따라 AR증강현실 로딩에 10초 이상의 시간이 소요될 수
            있습니다.
          </li>
          <li>
            사용자 디바이스가 물리적으로 불안정할 경우 AR 증강현실 체험이 어려울
            수 있습니다.
          </li>
          <li>AR 콘텐츠 사용 시 주변 장애물이나 안전에 주의하시기 바랍니다.</li>
        </ul>
        <Button onClick={onClick}>시작하기</Button>
      </ImgWrapper>
    </StartingWrapper>
  );
};
export default PrecautionsComponent;

const StartingWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

const PrecautionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  /* text-align: center; */
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
