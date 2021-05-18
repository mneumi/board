import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GuideItem, GuideItemProps } from './GuideItem';

export const Guide: React.FC = () => {
  const [t] = useTranslation();

  const [list] = useState<GuideItemProps[]>([
    {
      icon: 'link',
      title: 'home_page.guide.link',
    },
    {
      icon: 'music',
      title: 'home_page.guide.music',
    },
    {
      icon: 'todo',
      title: 'home_page.guide.todo',
    },
  ]);

  return (
    <Wrapper>
      {list.map(({ icon, title }) => {
        return (
          <GuideItem
            key={icon}
            icon={icon}
            title={t(`home_page.guide.${icon}`)}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  grid-area: nav;
  background-color: #1DA57A;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`;
