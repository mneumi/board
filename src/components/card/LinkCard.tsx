import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

interface Props {
  url: string;
  title: string;
  image: string;
}

export const LinkCard: React.FC<Props> = (props) => {
  const { url, title, image } = props;

  return (
    <Wrapper
      size="small"
      title={title}
      extra={<a href={url}>More</a>}
      bodyStyle={{ padding: 0 }}
      bordered={false}
    >
      <Image src={image} alt="" />
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  background-color: #fff;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: 5rem;
`;
