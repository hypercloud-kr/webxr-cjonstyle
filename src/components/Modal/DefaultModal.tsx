import styled from 'styled-components';

export const ModalWrapper = styled.div`
  background: var(--ng-1100);
  border-radius: 1.5rem;
  text-align: center;
  align-items: center;
  color: var(--white);
  width: 100vw;
  max-width: 21.25rem;
  //& > * {
  //  &:not(:last-child) {
  //    margin-bottom: 1.125rem;
  //  }
  //}
`;

export const ModalTitle = styled.h3`
  color: var(--White, #fff);
  /* Head/H 01 l 20 (SB) */
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.6875rem; /* 135% */
  letter-spacing: -0.0125rem;

  margin-bottom: 0.38rem;

  padding: 1.5rem 1.5rem 0rem 1.5rem;
`;

export const ModalSubTitle = styled.h3`
  color: var(--N-Gray-NG-500, #8c90a1);

  /* Sub-Head/SH 01 l 15 (R) */
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  //line-height: 1.3125rem; /* 140% */
  letter-spacing: -0.0125rem;

  margin-bottom: 1.12rem;

  padding: 0rem 1.5rem 0rem 1.5rem;
`;

export const ModalButtonWrapper = styled.div`
  padding: 0.5rem 1rem 1rem;
  display: flex;
  gap: 0.5rem;
  & > * {
    width: 100%;
  }
`;

export const EmptyHeaderArea = styled.div`
  padding-top: 0.0625rem;
  height: 0.0625rem;
`;
