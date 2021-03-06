import React from 'react';
import styled from 'styled-components';
import { Logo } from './Logo';
import { Nav } from './Nav';
import { User } from './User';
import { Language } from '../language';

export const Header: React.FC = () => {
  return (
    <Wrapper>
      <Logo />
      <Nav />
      <User />
      <Language />
    </Wrapper>
  );
};

const Wrapper = styled.header`
  grid-area: header;
  background-color: #1da57a;
  color: #fff;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #fff;
`;
