import React from 'react';
import styled from 'styled-components';
import { IconType as ReactIconType } from 'react-icons';
import { FaLink, FaMusic, FaAddressCard } from 'react-icons/fa';

export type IconType = 'link' | 'music' | 'todo';

export interface GuideItemProps {
  icon: IconType;
  title: string;
}

export const GuideItem: React.FC<GuideItemProps> = (props) => {
  const { icon, title } = props;

  return (
    <Wrapper highlight={true}>
      {React.createElement(computeIcon(icon))}
      <Title>{title}</Title>
    </Wrapper>
  );
};

const computeIcon = (icon: IconType): ReactIconType => {
  switch (icon) {
    case 'link':
      return FaLink;
    case 'music':
      return FaMusic;
    case 'todo':
      return FaAddressCard;
  }
};

const Wrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: ${(props: { highlight: boolean }) =>
    props.highlight ? '#2c324f' : ''};
  color: #fff;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  cursor: pointer;
`;

const Title = styled.div`
  width: 4rem;
  margin-left: 1rem;
`;
