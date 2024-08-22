import {
  // EmptyHeaderArea,
  ModalButtonWrapper,
  ModalWrapper,
} from './DefaultModal';
import { PrimaryButton } from '../Common/Button';
import styled from 'styled-components';
import { palette } from '@hypercloud-kr/styling-kit';

type ConfirmModalProps = {
  title: string;
  description?: string;
  confirmLabel?: string;
  onClickConfirm: () => void;
  cancelLabel?: string;
  onClickCancel: () => void;
};

export default function ConfirmModal({
  title,
  description,
  confirmLabel = '확인',
  onClickConfirm,
  cancelLabel = '취소',
  onClickCancel,
}: ConfirmModalProps) {
  return (
    <CustomModalWrapper>
      <ContentWrapper>
        <Title>{title}</Title>
        {description ? <Description>{description}</Description> : undefined}
      </ContentWrapper>
      <CustomModalButtonWrapper>
        <CancelButton onClick={onClickCancel}>{cancelLabel}</CancelButton>
        <ConfirmButton onClick={onClickConfirm}>{confirmLabel}</ConfirmButton>
      </CustomModalButtonWrapper>
    </CustomModalWrapper>
  );
}

const CustomModalWrapper = styled(ModalWrapper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  gap: 8px;
  padding: 8px;
`;

const Title = styled.div`
  font: var(--headline01-sb);
`;
const Description = styled.div`
  font: var(--subhead01-r);
  color: var(--g-600);
`;

const CustomModalButtonWrapper = styled(ModalButtonWrapper)`
  padding: 0;
  width: 100%;
`;

const CancelButton = styled(PrimaryButton)`
  background-color: ${palette.$var.coolNeutral[20]};
  cursor: pointer;
`;

const ConfirmButton = styled(PrimaryButton)`
  background-color: ${palette.$var.blue[60]};
  cursor: pointer;
`;
