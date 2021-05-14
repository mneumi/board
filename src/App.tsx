import React from 'react';
import styled from 'styled-components';
import { Header, Guide } from './components';

const App: React.FC = () => {
  return (
    <Wrapper>
      <Header />
      <Guide />
      <Main>Main</Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: red;
  display: grid;
  grid-template-rows: 3.5rem 1fr;
  grid-template-columns: 10rem 1fr;
  grid-template-areas:
    'header header'
    'nav main';
`;

const Main = styled.main`
  grid-area: main;
  background-color: #2c324f;
`;

export default App;
