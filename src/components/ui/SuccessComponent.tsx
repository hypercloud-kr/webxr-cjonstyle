import styled from '@emotion/styled';
import { stateStore } from '@/ar/storage';

export const SuccessComponent = () => {
  const apply = async () => {
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
    stateStore.setGameState('running');
  };

  return (
    <div>
      <h1>Success</h1>
      {stateStore.getState().score}
      <ApplyProduct onClick={apply}>상품 응모하기</ApplyProduct>
      <ReplayBtn onClick={replay}>replay</ReplayBtn>
    </div>
  );
};

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
