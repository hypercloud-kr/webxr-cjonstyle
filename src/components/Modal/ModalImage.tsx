import styled from 'styled-components';

interface ModalImageProps extends React.HTMLProps<HTMLImageElement> {}

const ModalImage = (props: ModalImageProps) => {
  if (!props) return null;
  return (
    <ModalImageWrapper>
      <img {...props} />
    </ModalImageWrapper>
  );
};

export default ModalImage;

const ModalImageWrapper = styled.div`
  & > img {
    max-width: 100%;
    max-height: 100%;
  }
`;
