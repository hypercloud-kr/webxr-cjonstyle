import styled from '@emotion/styled';

export function CouponToast() {
  return (
    <Container>
      <Wrapper>
        <CheckIcon />
        <span>링크가 복사되었습니다.</span>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: transparent;
  padding: 0 20px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 14px 20px;
  border-radius: 99px;
  background: rgba(68, 70, 80, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" fill="#1ED45A" />
      <path
        d="M8.39999 12L11.1 14.7L15.9849 9.81519"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
