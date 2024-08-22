import {
  ModalButtonWrapper,
  ModalSubTitle,
  ModalTitle,
  ModalWrapper,
} from './DefaultModal';
import styled from 'styled-components';
import { Button, PrimaryButton } from '../Common/Button';
import { HcSwal } from './HCSwal';

const RewardDialog = (props: { imageUrl?: string }) => {
  const { imageUrl } = props;
  const onClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    HcSwal.clickCancel();
  };
  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    HcSwal.clickConfirm();
    window.location.reload();
  };
  return (
    <ModalWrapper>
      <ModalTitle>Congratulations!</ModalTitle>
      <ModalSubTitle>Special reward is waiting for you.</ModalSubTitle>
      {imageUrl && (
        <RewardImageWrapper>
          <img src={imageUrl} />
        </RewardImageWrapper>
      )}
      <ModalButtonWrapper>
        <Button onClick={onClickCancel}>Stay</Button>
        <PrimaryButton onClick={onConfirm}>Go</PrimaryButton>
      </ModalButtonWrapper>
    </ModalWrapper>
  );
};

export default RewardDialog;

const RewardImageWrapper = styled.div`
  padding: 0 1.1875rem;
  & > img {
    border-radius: 0.75rem;
    width: 100%;
  }
`;
