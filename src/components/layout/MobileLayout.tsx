import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

export function MobileLayout() {
  return (
    <div css={mobileLayoutContainer}>
      <Outlet />
    </div>
  );
}

const mobileLayoutContainer = css`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;
