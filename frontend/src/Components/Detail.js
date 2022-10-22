import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useKNOV1Contract } from '../Context/KNOV1Context';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { viewContentState } from '../atoms';
import DetailQuestion from './DetailQuestion';

const Detail = () => {
  const { qid } = useParams();
  const { knov1Contract } = useKNOV1Contract();
  const [questionContent, setQuestionContent] = useState();

  const [selectedAnswerId, setSelectedAnswerId] = useState();
  const [isSelected, setIsSelected] = useState();
  const [isMine, setIsMine] = useState();

  const getQuestion = async (qid) => {
    const question = await knov1Contract.getQuestion(qid);
    const cid = question.cid;
    const reward = question.reward.toNumber();
    const res = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    const content = { ...res.data, reward: reward };
    setQuestionContent(content);
  };

  const checkIsSelected = async (qid) => {
    const selected = await knov1Contract.getIsSelected(qid).isSelected();

    if (selected) {
      const selectedAid = await knov1Contract
        .getSelectedAnswerId(qid)
        .toNumber();
      setSelectedAnswerId(selectedAid);
    }
  };

  const getAnswers = async (qid) => {
    const aids = await knov1Contract.getQuestionAids(qid);
    console.log(aids);
  };

  useEffect(() => {
    if (knov1Contract) {
      getQuestion(qid);
    }
  }, [knov1Contract]);

  // useEffect(() => {
  //   getQuestion(qid);
  //   checkIsSelected(qid);
  //   getAnswers(qid);
  // }, []);

  return (
    <div className="Detail">
      <div className="body">
        <div className="box">
          <DetailQuestion questionContent={questionContent} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
