import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { palette, typography, Button } from '@hypercloud-kr/styling-kit';

type TermsBottomSheetProps = {
  title: string;
  buttonText?: string;
  onClickButton?: () => void;
};

const BottomSheet = (props: PropsWithChildren<TermsBottomSheetProps>) => {
  const { title, children, buttonText = '닫기', onClickButton } = props;

  return (
    <Wrapper>
      <TitleSection>{title}</TitleSection>
      <div>{children}</div>
      <FixedEmptyArea />
      <ButtonWrapper>
        <Button
          size={'XL'}
          styleType={'filled'}
          color={palette.$var.blue[60]}
          onClick={onClickButton}
        >
          {buttonText}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default BottomSheet;

const Wrapper = styled.div`
  bottom: 0;
  width: 100vw;
  max-height: calc(100dvh - 54px);
  min-height: calc(100dvh - 54px);
  background: ${palette.$var.coolNeutral[10]};
  border-radius: 16px 16px 0 0;
  overflow-y: auto;
`;

const TitleSection = styled.h3`
  position: sticky;
  top: 0;
  background: ${palette.$var.coolNeutral[10]};
  padding: 16px;
  text-align: center;
  font: ${typography.body02[700]};
  border-bottom: solid 1px ${palette.$var.coolNeutral[25]};
  color: var(--white);
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(37, 38, 43, 0) 0%,
    rgba(37, 38, 43, 0.45) 14.68%,
    rgba(37, 38, 43, 0.94) 34.9%,
    #25262b 100%
  );
  padding: 32px 20px 16px;
`;

const FixedEmptyArea = styled.div`
  width: 100%;
  height: 88px;
`;
