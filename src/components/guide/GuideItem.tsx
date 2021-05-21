import React from 'react';
import styled from 'styled-components';
import { IconType as ReactIconType } from 'react-icons';
import { FaLink, FaMusic, FaAddressCard } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { GuideType } from '../../common/interface';
import { guideSlice } from '../../store/guideSlice';
import { RootDispatch, useSelector } from '../../store';

export interface GuideItemProps {
  icon: GuideType;
  title: string;
}

export const GuideItem: React.FC<GuideItemProps> = (props) => {
  const { icon, title } = props;
  const dispatch = useDispatch<RootDispatch>();
  const currentGuide = useSelector((state) => state.guide.currentGuide);

  const changeGuide = (icon: GuideType) => {
    dispatch(guideSlice.actions.changeGuide(icon));
  };

  return (
    <Wrapper
      highlight={currentGuide === icon}
      onClick={() => changeGuide(icon)}
    >
      {React.createElement(computeIcon(icon))}
      <Title>{title}</Title>
    </Wrapper>
  );
};

const computeIcon = (icon: GuideType): ReactIconType => {
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
    props.highlight ? '#207f4c' : ''};
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
