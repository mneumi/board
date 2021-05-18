import React from 'react';
import styled from 'styled-components';
import { GuideType } from '../../common/interface';
import { List as AntdList, Row, Col, Menu, Dropdown, Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { FaPlus } from 'react-icons/fa';

interface Props {
  type: GuideType;
  list: {
    id: number;
    userId: number;
    title: string;
  }[];
}

export const Content: React.FC<Props> = (props) => {
  const { list } = props;

  const showModal = (listId: number) => {
    Modal.error({
      title: '确认要删除吗？',
      content: `一旦删除就不能恢复了 ${listId}`,
      okText: '确认删除',
    });
  };

  return (
    <Wrapper>
      <Row style={{ width: '100%' }}>
        {list.map((item) => (
          <Col span={6} key={item.id}>
            <List
              bordered
              itemLayout="vertical"
              header={
                <ListHeader>
                  <ListHeaderTitle>
                    <ListHeaderTitleIcon />
                    <div>{item.title}</div>
                  </ListHeaderTitle>
                  <ListHeaderController>
                    <Plus style={{}} />
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item key="create">编辑列表</Menu.Item>
                          <Menu.Item
                            key="delete"
                            onClick={() => showModal(item.id)}
                          >
                            删除列表
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={['click']}
                    >
                      <SettingOutlined />
                    </Dropdown>
                  </ListHeaderController>
                </ListHeader>
              }
            />
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

const List = styled(AntdList)`
  background-color: #fff;
  margin: 1rem !important;
  border-radius: 0.3rem;
  height: calc(100% - 2rem);
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListHeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

const ListHeaderTitleIcon = styled.div`
  width: 0.3rem;
  height: 1rem;
  margin-right: 0.4rem;
  background-color: #1da57a;
`;

const ListHeaderController = styled.div`
  display: flex;
  align-items: center;
`;

const Plus = styled(FaPlus)`
  cursor: pointer;
  margin-right: 0.4rem;
  font-size: 0.8rem;
`;
