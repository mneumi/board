import React from 'react';
import styled from 'styled-components';
import { Header, Guide, Main } from '../../components';

export const HomeView: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <Guide />
      <Main />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 3.5rem 1fr;
  grid-template-columns: 10rem 1fr;
  grid-template-areas:
    'header header'
    'nav main';
`;
