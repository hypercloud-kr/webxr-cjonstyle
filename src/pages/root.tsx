import { css } from '@emotion/react';
import styled from '@emotion/styled';

export function RootPage() {
  return (
    <>
      Root Page
      <div
        css={css({
          backgroundColor: 'red',
          width: 100,
          height: 100,
        })}
      ></div>
      <Box />
    </>
  );
}

const Box = styled.div`
  background-color: blue;
  width: 100px;
  height: 100px;
`;
