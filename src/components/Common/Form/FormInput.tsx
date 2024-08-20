import styled from 'styled-components';
import IcInfoCircle from '../../../assets/svg/IcInfoCircle';
import { forwardRef } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput = forwardRef(
  (props: FormInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { error, ...inputProps } = props;
    return (
      <>
        <InputWrapper>
          <Input ref={ref} className={error ? 'error' : ''} {...inputProps} />
          {error && <IcInfoCircle color={'var(--r-primary)'} />}
        </InputWrapper>
        {error && <ErrorDescription>{error}</ErrorDescription>}
      </>
    );
  }
);

export default FormInput;

const InputWrapper = styled.div`
  position: relative;
  // 에러 아이콘
  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9375rem 1rem;
  background: var(--ng-1100);
  font: var(--body01-r);
  border-radius: 0.75rem;
  border: 1px solid var(--ng-1000);
  color: var(--white);
  &::placeholder {
    color: var(--ng-800);
  }
  &.error {
    border-color: var(--r-primary);
  }
  &:focus {
    border-color: var(--c-700);
  }
  &:focus-visible {
    outline: none;
  }
`;

const ErrorDescription = styled.div`
  color: var(--r-primary);
  font: var(--caption02-r);
`;
