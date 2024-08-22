import styled from 'styled-components';
import nl2br from 'react-nl2br';
import { PropsWithChildren } from 'react';

interface SimpleContentProps extends PropsWithChildren {
  title?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionTitle = (props: SimpleContentProps) => {
  return (
    <ContentWrapper className={props.align}>
      <ContentTitle>{props.title || props.children}</ContentTitle>
      {props.description && (
        <ContentDescription>{nl2br(props.description)}</ContentDescription>
      )}
    </ContentWrapper>
  );
};

export default SectionTitle;

const ContentWrapper = styled.div`
  text-align: left;
  &.center {
    text-align: center;
  }
  &.right {
    text-align: right;
  }
  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ContentTitle = styled.h4`
  font: var(--headline01);
  color: var(--white);
`;

const ContentDescription = styled.p`
  font: var(--subhead01-r);
  color: var(--ng-500);
`;
