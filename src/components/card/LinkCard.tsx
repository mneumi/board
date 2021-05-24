import React, { useCallback } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { SettingIcon } from './SettingIcon';

interface Props {
  listId: number;
  cardId: number;
  url: string;
  title: string;
  image: string;
  setPage: (v: number) => void;
}

export const LinkCard: React.FC<Props> = (props) => {
  const { cardId, url, title, image, listId, setPage } = props;

  const jumpUrl = useCallback(() => {
    window.open(url, '_blank');
  }, [url]);

  return (
    <Wrapper
      size="small"
      title={title}
      extra={
        <SettingIcon
          type="link"
          listId={listId}
          cardId={cardId}
          dto={{ url, title, image }}
          setPage={setPage}
        />
      }
      bodyStyle={{ padding: 0 }}
      headStyle={{ color: '#FFF' }}
      bordered={false}
      hoverable
    >
      <Image src={image} alt="" onClick={jumpUrl} />
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  width: calc(100% - 1rem);
  background-color: #1da57a;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  /* height: 10rem; */
`;

const Image = styled.img`
  width: 100%;
  height: 8rem;
`;
