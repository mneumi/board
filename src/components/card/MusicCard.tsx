import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause } from 'react-icons/fa';
import { SettingIcon } from './SettingIcon';

interface Props {
  listId: number;
  cardId: number;
  coverImg: string;
  song: string;
  singer: string;
  songUrl: string;
  language: 'chinese' | 'english';
  setPage: (v: number) => void;
}

export const MusicCard: React.FC<Props> = (props) => {
  const { coverImg, listId, cardId, setPage, song, singer, songUrl, language } =
    props;

  return (
    <Wrapper>
      <Img src={coverImg} alt="" />
      <Info>
        <Song>{song}</Song>
        <Singer>{singer}</Singer>
      </Info>
      <Controller>
        <PlayOrPause>
          <FaPlay />
        </PlayOrPause>
        <SettingIcon
          type="music"
          listId={listId}
          cardId={cardId}
          dto={{ coverImg, song, songUrl, singer, language }}
          setPage={setPage}
        />
      </Controller>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc(100% - 1rem);
  /* height: 3rem; */
  background-color: #1da57a;
  margin-top: 1rem;
  display: flex;
  color: #fff;
  flex: 1;
`;

const Img = styled.img`
  width: 3rem;
  /* height: 3rem; */
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 0.6rem;
  padding-top: 0.2rem;
`;

const Song = styled.div`
  font-size: 0.9rem;
`;

const Singer = styled.div`
  font-size: 0.4rem;
  color: #f3f3f3;
`;

const Controller = styled.div`
  width: 3.5rem;
  /* height: 3rem; */
  display: flex;
  align-items: center;
`;

const PlayOrPause = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 0.8rem;
`;
