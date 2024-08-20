import styled from 'styled-components';
import { forwardRef } from 'react';

interface RadioItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  text: string;
}

const RadioItem = forwardRef(
  (props: RadioItemProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { text, ...radioProps } = props;
    return (
      <Wrapper>
        <RadioInput ref={ref} type={'radio'} {...radioProps} />
        <RadioIcon />
        <RadioLabel>{text}</RadioLabel>
      </Wrapper>
    );
  }
);

export default RadioItem;

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  padding: 1rem 0.5rem;
  width: 100%;
`;

const RadioIcon = styled.i`
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  &::before,
  &::after {
    border-radius: 50%;
    content: ' ';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
  }
  &::before {
    width: 1.375rem;
    height: 1.375rem;
    background: var(--g-800);
  }
  &::after {
    width: 0.5rem;
    height: 0.5rem;
    background: var(--g-600);
  }
  input[type='radio']:checked + & {
    &::before {
      background: #10a1a1;
    }
    &::after {
      background: white;
    }
  }
`;

const RadioInput = styled.input`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
`;

const RadioLabel = styled.label`
  font: var(--subhead02-sb);
  margin-left: 0.5rem;
  display: inline-block;
`;
