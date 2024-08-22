import styled from 'styled-components';
// import nl2br from "react-nl2br";
import SectionTitle from '../Common/SectionTitle';

interface SimpleContentProps {
  title: string;
  description?: string;
}

const ModalContent = (props: SimpleContentProps) => {
  return (
    <Wrapper>
      <SectionTitle {...props} align={'center'} />
    </Wrapper>
  );
};

export default ModalContent;

const Wrapper = styled.div`
  padding: 1.625rem 1.125rem 1.125rem 1.125rem;
`;
