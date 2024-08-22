import { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';
import IcCheckbox from '../../assets/svg/IcCheckbox';

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const Checkbox = forwardRef(
  (props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { ...inputProps } = props;

    return (
      <Wrapper>
        <CheckboxInput type={'checkbox'} {...inputProps} ref={ref} />
        <IcCheckbox />
      </Wrapper>
    );
  }
);

export default Checkbox;

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
  vertical-align: middle;
  input[type='checkbox']:checked + svg {
    rect {
      fill: var(--c-700);
    }
    path {
      opacity: 1;
    }
  }
`;

const CheckboxInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0 !important;
  opacity: 0;
  display: block;
`;
