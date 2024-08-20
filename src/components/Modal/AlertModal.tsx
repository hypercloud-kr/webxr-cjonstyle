import {
  EmptyHeaderArea,
  ModalButtonWrapper,
  ModalWrapper,
} from './DefaultModal';
import { PrimaryButton } from '../Common/Button';
// import ExclamationImg from "../../assets/images/img_co_popup-img_exclamation_02.png";
import { HcSwal } from './HCSwal';
// import ModalImage from "./ModalImage";
import ModalContent from './ModalContent';

interface AlertModalProps {
  icon?: string;
  title: string;
  description?: string;
  confirmText?: string;
}

const AlertModal = (props: AlertModalProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    HcSwal.clickCancel();
  };
  return (
    <ModalWrapper>
      <EmptyHeaderArea />
      <ModalContent {...props} />
      <ModalButtonWrapper>
        <PrimaryButton onClick={onClick}>OK</PrimaryButton>
      </ModalButtonWrapper>
    </ModalWrapper>
  );
};

export default AlertModal;
