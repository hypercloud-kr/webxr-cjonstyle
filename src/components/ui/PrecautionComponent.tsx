import styled from 'styled-components';
// import mainImg from '/@assets/img/img_tit-logo.svg';
import backgroundImg from '@/assets/imgs/background.jpg';
// import { typography } from '@hypercloud-kr/styling-kit';
import { stateStore } from '@/ar/storage';
import crownImg from '@/assets/imgs/crown.png';
import bgImg from '@/assets/imgs/img__co_on_02_bg.png';

// const body700 = typography.body02[700];

const PrecautionsComponent = () => {
  const onClick = () => {
    stateStore.setGameState('running');
  };
  return (
    <StartingWrapper>
      <TitleImg src={crownImg}></TitleImg>
      <PrecautionTitle>유의사항</PrecautionTitle>
      <ImgWrapper>
        <PrecautionUl>
          <li>크롬, 사파리 브라우저 사용을 권장합니다.</li>
          <li>
            네트워크 환경에 따라 AR 증강현실 로딩에 10초 이상의 시간이 소요될 수
            있습니다.
          </li>
          <li>
            사용자 디바이스가 물리적으로 불안정할 경우 AR 증강현실 체험이 어려울
            수 있습니다.
          </li>
          <li>AR 콘텐츠 사용 시 주변 장애물이나 안전에 주의하시기 바랍니다.</li>
          <li>
            CJ온스타일 회원이 아니라면 참여하신 게임 점수가 사라집니다.
            회원가입하시고 경품에 도전하세요!
          </li>
        </PrecautionUl>
        <Button onClick={onClick}>확인</Button>
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
  align-items: center;
  background: url(${bgImg}) 0 0px;
  object-fit: cover;
  background-position: center;
  background-size: cover;
`;

const TitleImg = styled.img`
  margin-top: 80px;
  width: 38.52px;
  height: 19.52px;

  @media (max-height: 650px) {
    margin-top: 50px;
  }
`;
const PrecautionTitle = styled.div`
  color: #00ff9c;
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 46.557px; /* 155.188% */
  letter-spacing: 0.6px;
  text-transform: uppercase;
`;

const ImgWrapper = styled.div`
  display: inline-flex;
  margin-top: 22px;
  margin-bottom: 4px;
  padding: 0px 25px;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  color: var(--white, var(--common-100, #fff));
  /* text-align: center; */
  /* font: var(--display01-b); */
  line-height: 142%;

  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 152%; /* 22.8px */
`;

const PrecautionUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 340px;
  padding-inline-start: 30px;
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

  border-radius: 8px;
  background: #fff;

  text-align: center;
  border-width: 0px;
  color: #7515d8;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
  letter-spacing: -0.2px;
`;
