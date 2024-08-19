import styled from '@emotion/styled';
import { stateStore } from '@/ar/storage';

export const SuccessComponent = () => {
  const replay = () => {
    stateStore.setGameState('running');
  };
  return (
    <div>
      <h1>Success</h1>
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
