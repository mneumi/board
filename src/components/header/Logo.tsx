import React from 'react';
import styled from 'styled-components';
import LogoImage from '../../assets/logo.svg';

export const Logo: React.FC = () => {
  return (
    <Wrapper>
      <img src={LogoImage} alt="board" width={120} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 10rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
