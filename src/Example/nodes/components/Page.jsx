import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  flex-grow: 1;
  padding: 15px;
  background: #eeeeee;
  position: relative;
`;

const Page = ({ children }) => {
  return (
    <PageWrapper className="h-lc-page">
      {children}
    </PageWrapper>
  );
};

export default Page;
