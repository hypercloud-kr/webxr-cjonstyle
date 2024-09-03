import styled from '@emotion/styled';
import { stateStore } from '@/ar/storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDeviceId } from '../../util/util';
import ellipse from '@/assets/svg/elipse.svg';
export const SuccessComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [isCopiedLink, setIsCopiedLink] = useState(false);

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
    axios.post(url, {
      headers: {
        appKey,
      },
      score: stateStore.getState().score,
      deviceId: getDeviceId(),
    });
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
        url: 'https://example.com', // 공유할 URL
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

        // setIsCopiedLink(true);
        // setTimeout(() => {
        //   setIsCopiedLink(false);
        // }, 300000);
      },
      err => {
        console.error('URL 복사에 실패했습니다.', err);
      }
    );
  };
  const setResultState = score => {
    // const score = stateStore.getState().score;
    if (10 <= score && score < 40) {
      setTitle('쇼핑뉴비');
      setDescription('핫템을 겟하기에는 스피드가 부족했어요!');
    } else if (40 <= score && score < 60) {
      setTitle('쇼핑초보');
      setDescription('쇼핑 고수가 되기엔 아직 멀고도 험하군요!');
    } else if (60 <= score && score < 90) {
      setTitle('쇼핑고수');
      setDescription('행운의 기회가 가까워지고 있어요!');
    } else if (90 <= score) {
      setTitle('쇼핑달인');
      setDescription('WOW! 핫템을 놓치지 않는 놀라운 실력의 소유자!');
    }
  };
  return (
    <SuccessContainer>
      <ResultContainer>
        {stateStore.getState().score === 0 ? (
          <div>Time out</div>
        ) : (
          <div>{title}</div>
        )}
        <ScoreDiv>{stateStore.getState().score}</ScoreDiv>
        <ScoreSectionContainer>
          <ScoreSection>
            <ColumnFlex>
              <div>뉴비</div>
              <img src={ellipse}></img>
              <>10~30점</>
            </ColumnFlex>
          </ScoreSection>
          <ScoreSection>
            <ColumnFlex>
              <div>뉴비</div>
              <img src={ellipse}></img>
              <>10~30점</>
            </ColumnFlex>
          </ScoreSection>
          <ScoreSection>
            <ColumnFlex>
              <div>뉴비</div>
              <img src={ellipse}></img>
              <>10~30점</>
            </ColumnFlex>
          </ScoreSection>
          <ScoreSection>
            <ColumnFlex>
              <div>뉴비</div>
              <img src={ellipse}></img>
              <>10~30점</>
            </ColumnFlex>
          </ScoreSection>
        </ScoreSectionContainer>
        <DescriptionDiv>{description}1</DescriptionDiv>
      </ResultContainer>
      <ChoiceContainer>
        <BtnGroup>
          <ApplyProduct>상품 응모하기</ApplyProduct>
          <ReplayBtn onClick={replay}>replay</ReplayBtn>
        </BtnGroup>
        <ShareGroup>
          <ShareBtn onClick={share}>share</ShareBtn>
        </ShareGroup>
        <CopyBtn onClick={copyLink}>copy link</CopyBtn>
        {/* {isCopiedLink && <CopyText>링크 복사 완료</CopyText>} */}
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
  align-items: center;
`;
const ResultContainer = styled.div`
  display: flex;
  width: calc(100% - 60px);
  margin: 90px 30px 0 30px;
  height: 300px;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.25);
  flex-direction: column;
  align-items: center;
  padding: 0 18px;
  gap: 21px;
  /* justify-content: center;
  align-items: center;
  flex-direction: column; */
`;
const ScoreDiv = styled.div`
  font-size: 33px;
  flex-shrink: 0;
  color: #6e15ce;
`;
const ScoreSectionContainer = styled.div`
  width: 100%;
  height: 30%;
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
    left: 50%;
    top: 50%;
    z-index: 0;
    transform: translateY(-50%);
  }
`;
const ColumnFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  width: 80%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BtnGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ReplayBtn = styled.button`
  background-color: #f00;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;
const ApplyProduct = styled.button`
  background-color: #f00;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;
const ShareGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ShareBtn = styled.button`
  border-radius: 50%;
`;
const CopyBtn = styled.button`
  border-radius: 50%;
`;
// const CopyText = styled.div`
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   bottom: 30px;
// `;
