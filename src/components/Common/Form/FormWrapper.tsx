import styled from 'styled-components';
import { PropsWithChildren } from 'react';

interface FormWrapperProps extends PropsWithChildren {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const FormWrapper = (props: FormWrapperProps) => {
  const { title, description, children } = props;
  return (
    <Wrapper>
      <FormTitle>{title}</FormTitle>
      {children}
      {description && <FormDescription>{description}</FormDescription>}
    </Wrapper>
  );
};

export default FormWrapper;

const Wrapper = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 0.375rem;
  }
`;

const FormTitle = styled.div`
  color: var(--g-600);
  font: var(--subhead01-r);
`;

const FormDescription = styled.div`
  color: var(--g-600);
  font: var(--caption02-r);
`;
