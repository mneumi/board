import React from 'react';
import styled from 'styled-components';
import { GuideType } from '../../common/interface';
import { Row, Col } from 'antd';
import { List } from '../list';

interface Props {
  type: GuideType;
  list: {
    id: number;
    userId: number;
    title: string;
  }[];
}

export const Content: React.FC<Props> = (props) => {
  const { list, type } = props;

  return (
    <Wrapper>
      <Row style={{ width: '100%' }}>
        {list.map((item) => (
          <Col span={6} key={item.id}>
            <List listId={item.id} type={type} title={item.title}></List>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`;
