import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  padding: 0.8125rem 0 0.875rem;
  text-align: center;
  border-radius: 0.75rem;
  border: 0;
  background: var(--N-Gray-NG-1000, #3a3b49);
  font: var(--subhead01-sb);
  color: var(--white);
  &:disabled {
    color: var(--wt-30);
  }
`;

export const PrimaryButton = styled(Button)`
  background: #4545d1;
  &.disabled,
  &:disabled {
    background: var(--ng-1000);
  }
`;
