// import {HcSwal} from "./HCSwal";
import styled from 'styled-components';

interface CopySnackbarProps {
  icon?: string;
  title: string;
  description?: string;
  confirmText?: string;
}

const CopySnackbar = (props: CopySnackbarProps) => {
  return <Snackbar>{props.title}</Snackbar>;
};

export default CopySnackbar;

const Snackbar = styled.div`
  padding: 14px 25px;
  background: var(--g-900);
  color: white;
  width: max-content;
  border-radius: 50px;
  margin: auto auto 24px;
  position: relative;
`;
