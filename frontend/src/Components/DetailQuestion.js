import React, { useEffect } from 'react';
import { useKNOV1Contract } from '../Context/KNOV1Context';

const DetailQuestion = ({ questionContent }) => {
  const { knov1Contract } = useKNOV1Contract();

  useEffect(() => {
    const getQuestionCid = async () => {
      const cid = await knov1Contract.getQuestionCid(questionContent?.qid);
      questionContent.cid = cid;
    };

    if (questionContent) {
      getQuestionCid();
    }
  }, [questionContent]);

  return (
    <div className="container question-container">
      <h3>Question</h3>

      <div className="box-part">
        <div className="title content-box">
          <h5>Title</h5>
          <span>{questionContent?.title}</span>
        </div>

        <div className="text content-box">
          <h6>CID</h6>
          <span>
            <a
              href={`https://ipfs.io/ipfs/${questionContent?.cid}`}
              target="_blank"
              rel="noreferrer"
            >
              {questionContent?.cid}
            </a>
          </span>
        </div>

        <div className="text content-box">
          <h6>Nickname (Address)</h6>
          <span>
            {questionContent?.nickname} (
            <a
              href={`https://goerli.etherscan.io/address/${questionContent?.author}`}
              target="_blank"
              rel="noreferrer"
            >
              {questionContent?.author}
            </a>
            )
          </span>
        </div>

        <div className="text content-box">
          <h6>Content: </h6>
          <span>{questionContent?.content}</span>
        </div>

        <div className="text content-box">
          <h6>Reward Token: </h6>
          <span>{questionContent?.reward}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailQuestion;
