import styled from 'styled-components';
// import mainImg from '/@assets/img/img_tit-logo.svg';
import backgroundImg from '@/assets/imgs/background.jpg';
// import { typography } from '@hypercloud-kr/styling-kit';
import { useEffect } from 'react';
import startingImg from '@/assets/imgs/starting_img.png';
import { useLocation, useNavigate } from 'react-router-dom';

// const body700 = typography.body02[700];

const StartingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromApp = queryParams.get('fromApp') ?? false;
  useEffect(() => {
    setTimeout(() => {
      navigate(`/precautions?fromApp=${fromApp}`);
      // stateStore.setGameState('precautions');
    }, 1000);
  }, []);
  // const onClick = () => {
  //   stateStore.setGameState('precautions');
  // };
  return (
    <StartingWrapper>
      <StartingImg src={startingImg} />
    </StartingWrapper>
  );
};
export default StartingPage;

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
  background: rgb(211, 211, 211) url(/backgroundImg.png) 0 0px;
  object-fit: cover;
  background-position: center;
  background-size: cover;
  justify-content: center;
  align-items: center;
  background: #6e00ce;
`;

const StartingImg = styled.img`
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-20px);
`;
// const ImgWrapper = styled.div`
//   display: inline-flex;
//   margin-top: 111px;
//   margin-bottom: 4px;
//   padding: 0px 20px;
//   flex-direction: column;
//   align-items: center;
//   gap: 24px;

//   color: var(--white, var(--common-100, #fff));
//   text-align: center;
//   font: var(--display01-b);
//   line-height: 142%;
// `;

// const Button = styled.button`
//   position: fixed;
//   display: flex;
//   bottom: 24px;
//   width: calc(100% - 40px);
//   padding: 16px 0px;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;

//   border-radius: 16px;
//   background: var(--blue-60, #3285fa);

//   text-align: center;
//   border-width: 0px;
//   color: var(--common-100, #fff);
//   font: ${body700};
//   /* Body_01/700 */
// `;
