import styled from '@emotion/styled';
import { stateStore } from '@/ar/storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDeviceId } from '../../util/util';

export const SuccessComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
  };
  const setResultState = score => {
    // const score = stateStore.getState().score;
    if (10 <= score && score < 40) {
      setTitle('쇼핑뉴비');
      setDescription('쇼핑의 시작은 당신과 함께!');
    } else if (40 <= score && score < 60) {
      setTitle('쇼핑초보');
      setDescription('쇼핑의 시작은 당신과 함께!');
    } else if (60 <= score && score < 90) {
      setTitle('쇼핑고수');
      setDescription('쇼핑의 시작은 당신과 함께!');
    } else if (90 <= score) {
      setTitle('쇼핑달인');
      setDescription('쇼핑의 시작은 당신과 함께!');
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

        {stateStore.getState().score}
        <div>티어</div>
        <div>{description}</div>
      </ResultContainer>
      <ChoiceContainer>
        <BtnGroup>
          <ApplyProduct>상품 응모하기</ApplyProduct>
          <ReplayBtn onClick={replay}>replay</ReplayBtn>
        </BtnGroup>
        <ShareGroup>
          <ShareBtn onClick={share}>share</ShareBtn>
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
  align-items: center;
`;
const ResultContainer = styled.div`
  display: flex;
  width: 80%;
  height: 300px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
