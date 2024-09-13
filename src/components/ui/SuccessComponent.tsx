import styled from '@emotion/styled';
import { stateStore } from '@/ar/storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDeviceId } from '../../util/util';
import ellipse from '@/assets/svg/elipse.svg';
import ellipseCheck from '@/assets/svg/ellipse_check.svg';
import backgroundImg from '@/assets/imgs/img_score results_bg.png';
import imgScore1 from '@/assets/imgs/img_score1.png';
import imgScore2 from '@/assets/imgs/img_score2.png';
import imgScore3 from '@/assets/imgs/img_score3.png';
import imgScore4 from '@/assets/imgs/img_score4.png';
import kakaoTalkImg from '@/assets/imgs/kakao-talk 1.png';
import { css } from '@emotion/react';
import { toast } from 'react-toastify';
import { CouponToast } from './CouponToast';

export const SuccessComponent = () => {
  // const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [description2, setDescription2] = useState('');
  const [titleImg, setTitleImg] = useState('');
  const [playedUuid, setPlayedUuid] = useState('');

  useEffect(() => {
    //appkey는 헤더에 필요
    let appKey;
    let campaignId;
    let url;
    if (process.env.NODE_ENV === 'production') {
      appKey = 'aa32beb9-5c79-4016-a0f4-b2a0bb489c42';
      campaignId = 56;
      url = `https://api.hars.kr/client/campaign/${campaignId}/played`;
    } else {
      appKey = 'bdc1ebfa-d33d-4ea1-9297-d0b114aef4c8';
      campaignId = 401;
      url = `https://api.stg.hars.kr/client/campaign/${campaignId}/played`;
    }
    axios
      .post(
        url,
        {
          score: stateStore.getState().score,
          deviceId: getDeviceId(),
        },
        {
          headers: {
            appKey,
          },
        }
      )
      .then(res => {
        setPlayedUuid(res.data.id);
        console.log(res.data);
      });

    try {
      console.log(import.meta.env.VITE_NODE_ENV, process.env.NODE_ENV);
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    setResultState(stateStore.getState().score);
  }, [stateStore.getState().score]);
  const share = async () => {
    try {
      // 공유할 데이터 설정
      const shareData = {
        title: '공유할 제목',
        text: '공유할 텍스트 내용',
        url: location.href, // 공유할 URL
      };

      // Web Share API를 사용하여 공유 다이얼로그 열기
      await navigator.share(shareData);
      console.log('공유가 성공적으로 완료되었습니다!');
    } catch (error) {
      console.error('공유가 취소되거나 실패했습니다.', error);
    }
  };
  const replay = () => {
    stateStore.setScore(true);
    stateStore.setCount(true);
    stateStore.setGameState('running');
    stateStore.setReady(false);
  };
  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        console.log('URL이 복사되었습니다.');

        toast(<CouponToast />, {
          containerId: 'link-toast',
          hideProgressBar: true,
          closeButton: false,
          closeOnClick: false,
          autoClose: 2000,
          position: 'bottom-center',
          toastId: 'link-toast',
        });
      },
      err => {
        console.error('URL 복사에 실패했습니다.', err);
      }
    );
  };
  const apply = () => {
    if (process.env.NODE_ENV === 'production') {
      window.location.href = `https://dev-display.cjonstyle.com/m/exhibition/exhibitionDetail?infl_cd=I5105&plnExhbId=202409067081&playedId=${playedUuid}`;
    } else {
      window.location.href = `https://display.cjonstyle.com/m/exhibition/exhibitionDetail?plnExhbId=202409067081&playedId=${playedUuid}`;
    }
    //playedUuid
  };
  const setResultState = score => {
    // const score = stateStore.getState().score;
    if (0 <= score && score < 40) {
      // setTitle('쇼핑뉴비');
      setDescription('핫템을 겟하기에는');
      setDescription2('스피드가 부족했어요!');
      setTitleImg(imgScore1);
    } else if (40 <= score && score < 60) {
      // setTitle('쇼핑초보');
      setDescription('쇼핑 고수가 되기엔 ');
      setDescription2('아직 멀고도 험하군요!');
      setTitleImg(imgScore2);
    } else if (60 <= score && score < 90) {
      // setTitle('쇼핑고수');
      setDescription('행운의 기회가');
      setDescription2('가까워지고 있어요!');
      setTitleImg(imgScore3);
    } else if (90 <= score) {
      // setTitle('쇼핑달인');
      setDescription('WOW! 핫템을 놓치지 않는');
      setDescription2('놀라운 실력의 소유자!');
      setTitleImg(imgScore4);
    }
  };
  return (
    <SuccessContainer>
      <ResultContainer>
        <TitleDiv>
          <img src={titleImg} />
        </TitleDiv>
        <ScoreDiv>{stateStore.getState().score}점</ScoreDiv>
        <ScoreSectionContainer>
          <ScoreSection>
            <ColumnFlex>
              <ColumnTitle
                check={
                  0 <= stateStore.getState().score &&
                  stateStore.getState().score <= 30
                    ? true
                    : false
                }
              >
                뉴비
              </ColumnTitle>
              <ColumnImg
                src={
                  0 <= stateStore.getState().score &&
                  stateStore.getState().score <= 30
                    ? ellipseCheck
                    : ellipse
                }
              ></ColumnImg>
              <ColumnScore
                check={
                  0 <= stateStore.getState().score &&
                  stateStore.getState().score <= 30
                    ? true
                    : false
                }
              >
                0~30점
              </ColumnScore>
            </ColumnFlex>
          </ScoreSection>
          <ScoreSection>
            <ColumnFlex>
              <ColumnTitle
                check={
                  40 <= stateStore.getState().score &&
                  stateStore.getState().score <= 50
                    ? true
                    : false
                }
              >
                초보
              </ColumnTitle>
              <ColumnImg
                src={
                  40 < stateStore.getState().score &&
                  stateStore.getState().score <= 50
                    ? ellipseCheck
                    : ellipse
                }
              ></ColumnImg>
              <ColumnScore
                check={
                  40 <= stateStore.getState().score &&
                  stateStore.getState().score <= 50
                    ? true
                    : false
                }
              >
                40~50점
              </ColumnScore>
            </ColumnFlex>
          </ScoreSection>
          <ScoreSection>
            <ColumnFlex>
              <ColumnTitle
                check={
                  60 <= stateStore.getState().score &&
                  stateStore.getState().score <= 80
                    ? true
                    : false
                }
              >
                고수
              </ColumnTitle>
              <ColumnImg
                src={
                  60 < stateStore.getState().score &&
                  stateStore.getState().score <= 80
                    ? ellipseCheck
                    : ellipse
                }
              ></ColumnImg>
              <ColumnScore
                check={
                  60 <= stateStore.getState().score &&
                  stateStore.getState().score <= 80
                    ? true
                    : false
                }
              >
                60~80점
              </ColumnScore>
            </ColumnFlex>
          </ScoreSection>
          <ScoreSection>
            <ColumnFlex>
              <ColumnTitle
                check={90 <= stateStore.getState().score ? true : false}
              >
                달인
              </ColumnTitle>
              <ColumnImg
                src={90 < stateStore.getState().score ? ellipseCheck : ellipse}
              ></ColumnImg>
              <ColumnScore
                check={90 <= stateStore.getState().score ? true : false}
              >
                90점~
              </ColumnScore>
            </ColumnFlex>
          </ScoreSection>
        </ScoreSectionContainer>
        <DescriptionDiv>
          <div>{description}</div>
          <div>{description2}</div>
        </DescriptionDiv>
      </ResultContainer>
      <ChoiceContainer>
        <InfoGroup>
          <InfoDiv>점수가 높을수록 당첨 확률 UP!</InfoDiv>
          <ApplyProduct onClick={apply}>상품 응모하기</ApplyProduct>
        </InfoGroup>
        <ReplayBtn onClick={replay}>다시 플레이하기</ReplayBtn>
        <ShareGroup>
          <ShareBtn src={kakaoTalkImg} onClick={share} />
          <CopyBtn onClick={copyLink}>URL</CopyBtn>
        </ShareGroup>
      </ChoiceContainer>
    </SuccessContainer>
  );
};

const SuccessContainer = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  flex-direction: column;
  gap: 60px;
  align-items: center;
  background-image: url(${backgroundImg});
  justify-content: center;
`;
const ResultContainer = styled.div`
  position: relative;
  display: flex;
  width: calc(100% - 60px);
  margin: 75px 30px 0 30px;
  /* height: 300px; */
  border-radius: 13px;
  background: #fff;
  box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
  flex-direction: column;
  align-items: center;
  padding: 57px 0 20px 0;
  gap: 21px;
  /* justify-content: center;
  align-items: center;
  flex-direction: column; */
`;
const TitleDiv = styled.div`
  /* width: 146.104px;
  height: 74.011px;
  flex-shrink: 0;
  background-color: #43107A;
  border-radius: 50%; */
  position: absolute;
  top: -59px;
  /* color: white; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 157px;
  height: 99px;
`;
const ScoreDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 59px;
  height: 61px;
  flex-shrink: 0;
  color: #6e15ce;
  font-family: yoon-a-yoonche, sans-serif;
  font-weight: 400;
  font-style: normal;
`;
const ScoreSectionContainer = styled.div`
  width: calc(100% - 40px);
  height: 90px;
  display: flex;
  flex-shrink: 0;
  border-radius: 10.941px;
  background: #14fea2;
  box-shadow: 0px 4.376px 0px 0px rgba(0, 0, 0, 0.25);
  flex-direction: row;
`;
const ScoreSection = styled.div`
  display: flex;
  flex: 0 0 25%;
  justify-content: center;
  align-items: center;
  position: relative;
  & > div {
    z-index: 1;
  }
  &:not(:last-child)::after {
    position: absolute;
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: #640faf;
    left: 49%;
    top: 59%;
    z-index: 0;
    transform: translateY(-50%);
  }
`;
const ColumnFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;

const ColumnTitle = styled.div`
  color: #640faf;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: 27.063px; /* 150.351% */
  ${props =>
    props.check &&
    css`
      border-radius: 5.471px;
      background: #640faf;
      padding: 0 5px;
      /* width: 51px;
    height: 17px; */
      color: #fff;
      text-align: center;
      font-family: Pretendard;
      font-size: 18px;
      font-style: normal;
      font-weight: 800;
      line-height: 27.063px; /* 150.351% */
    `}
`;
const ColumnImg = styled.img``;
const ColumnScore = styled.div`
  display: flex;
  align-items: center;
  color: #252525;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 27.063px; /* 208.178% */
  height: 10px;
  padding-top: 5px;
  ${props =>
    props.check &&
    css`
      font-weight: 700;
      padding-top: 0;
    `}
`;

const DescriptionDiv = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;
const ChoiceContainer = styled.div`
  display: flex;
  width: calc(100% - 60px);
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
// const BtnGroup = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: center;
//   align-items: center;
// `;
const ReplayBtn = styled.button`
  width: 330px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #fff;
  color: #6e00ce;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.2px;
  border: none;
`;

const InfoGroup = styled.div`
  position: relative;
`;
const InfoDiv = styled.div`
  position: absolute;
  width: 177.51px;
  height: 38px;
  top: -43px;
  right: 15px;
  background-color: #c49fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #252525;
  text-align: center;
  font-family: Pretendard;
  font-size: 12.078px;
  font-style: normal;
  font-weight: 600;
  line-height: 17.255px; /* 142.857% */
  letter-spacing: -0.173px;
  &::after {
    border-top: 10px solid #c49fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 38px;
    left: 145px;
  }
`;
const ApplyProduct = styled.button`
  width: 330px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #14fea2;
  color: #6e00ce;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.2px;
  border: none;
  margin-bottom: 11px;
`;
const ShareGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  gap: 17px;
`;
const ShareBtn = styled.img`
  width: 38px;
  height: 38px;
`;
const CopyBtn = styled.button`
  border-radius: 50%;
  background-color: #adadad;
  width: 38px;
  height: 38px;
  border: none;

  color: #3f0892;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 19.5px */
  letter-spacing: -0.143px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
// const CopyText = styled.div`
//   position: fixed;
//   /* width: 100%;
//   height: 100%; */
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   bottom: 30px;
//   padding: 10px;
//   background-color: black;
//   font: white;
// `;
