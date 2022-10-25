import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useKNOV1Contract } from '../Context/KNOV1Context';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { viewContentState } from '../atoms';
import DetailQuestion from './DetailQuestion';
import { useWallet } from '../Context/WalletContext';
import { getSigner } from '../Helpers/provider';
import DetailAnswerForm from './DetailAnswerForm';
import DetailAnswer from './DetailAnswer';

const Detail = () => {
  const { qid } = useParams();
  const { knov1Contract } = useKNOV1Contract();
  const { walletAddress } = useWallet();
  const [userNickname, setUserNickname] = useState('');

  const [questionContent, setQuestionContent] = useState();

  const [selectedAnswerId, setSelectedAnswerId] = useState();
  const [isSelected, setIsSelected] = useState();
  const [isMine, setIsMine] = useState();
  const [isRegistered, setIsRegistered] = useState();

  const getQuestion = async (qid) => {
    // get question
    const question = await knov1Contract.getQuestion(qid);
    const cid = question.cid;
    const reward = question.reward.toNumber();
    const res = await axios.get(`https://nftstorage.link/ipfs/${cid}`);
    const content = { ...res.data, reward: reward };
    setQuestionContent(content);
  };

  const checkIsAuthor = async () => {
    // check if this question was written by this address
    if (walletAddress) {
      const signedKnoV1Contract = knov1Contract.connect(await getSigner());
      const isAuthor = await signedKnoV1Contract.getIsAuthor(qid);
      console.log('isAuthor: ', isAuthor);
      setIsMine(isAuthor);
    }
  };

  const checkIsSelected = async (qid) => {
    const selected = await knov1Contract.getIsSelected(qid);
    setIsSelected(selected);
    console.log('isSelected: ', selected);

    if (selected) {
      const selectedAid = (
        await knov1Contract.getSelectedAnswerId(qid)
      ).toNumber();
      console.log('here!!!!: ', selectedAid);
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
      checkIsSelected(qid);
      getAnswers(qid);
      checkIsAuthor();
    }
  }, [knov1Contract]);

  // gets userWallet's nickname / isRegistered info from contract
  useEffect(() => {
    if (knov1Contract) {
      const getUserInfo = async () => {
        const registry = await knov1Contract.getIsRegistered(walletAddress);
        console.log('isRegistered: ', registry);
        setIsRegistered(registry);

        if (registry) {
          const nickname = await knov1Contract.getUserNickname(walletAddress);
          console.log('nickname: ', nickname);
          setUserNickname(nickname);
        }
      };

      if (walletAddress) {
        getUserInfo();
      }
    }
  }, [knov1Contract]);

  // useEffect(() => {
  //   getQuestion(qid);
  // }, []);

  return (
    <div className="Detail">
      <div className="body">
        <div className="box">
          <DetailQuestion questionContent={questionContent} />

          <DetailAnswer
            qid={qid}
            isMine={isMine}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            selectedAnswerId={selectedAnswerId}
            setSelectedAnswerId={setSelectedAnswerId}
            knov1Contract={knov1Contract}
          />

          {!isMine && isRegistered && !isSelected ? (
            <DetailAnswerForm
              qid={qid}
              knov1Contract={knov1Contract}
              walletAddress={walletAddress}
              userNickname={userNickname}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Detail;
