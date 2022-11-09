import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useKNOV1Contract } from '../Context/ContractContext';
import { getSigner } from '../Helpers/provider';

const DetailAnswer = ({
  qid,
  isMine,
  isSelected,
  setIsSelected,
  selectedAnswerId,
  setSelectedAnswerId,
  knov1Contract,
}) => {
  const [answerContents, setAnswerContents] = useState([]);
  const [selectedAnswerContent, setSelectedAnswerContent] = useState();

  // get answer contents
  useEffect(() => {
    const getAnswerContents = async () => {
      // checks if the question has been selected
      const selected = await knov1Contract.getIsSelected(qid);
      setIsSelected(selected);

      // gets selected aid if selected
      if (selected) {
        const aid = (await knov1Contract.getSelectedAnswerId(qid)).toNumber();
        setSelectedAnswerId(aid);
      }

      // get questionAids
      const questionAids = (await knov1Contract.getQuestionAids(qid)).map(
        (aid) => aid.toNumber()
      );

      // get cids
      const cids = [];
      for (let aid of questionAids) {
        const cid = await knov1Contract.getAnswerCid(aid);
        cids.push(cid);
        console.log(cid);
      }

      // get contents from cids
      const contents = [];
      const uris = cids.map((cid) => `https://nftstorage.link/ipfs/${cid}`);
      for (let uri of uris) {
        try {
          const response = await axios.get(uri);
          const responseData = response.data;
          console.log('response: ', responseData);
          const cid = await knov1Contract.getAnswerCid(responseData.aid);
          responseData.cid = cid;
          contents.push(responseData);
        } catch (err) {
          console.log(err);
        }
      }

      const selectedAnswer = contents.find(
        (answer) => answer.aid === selectedAnswerId
      );
      setSelectedAnswerContent(selectedAnswer);
      setAnswerContents(contents);
    };

    if (knov1Contract) {
      getAnswerContents();
    }
  }, [knov1Contract]);

  const onSelectAnswer = async (e, aid, qid) => {
    console.log(aid, qid);
    const signedKnoV1Contract = knov1Contract.connect(await getSigner());
    const tx = await signedKnoV1Contract.selectAnswer(qid, aid);
    await tx.wait();
    alert('answer selected!, 20% reward paid back');
    window.location.reload();
  };

  return (
    <>
      {isSelected ? (
        <div className="container answer-container">
          <div>
            <h3>Selected Answer</h3>
            {answerContents.map((answer) => {
              if (answer.aid === selectedAnswerId) {
                return (
                  <div className="box-part" key={answer.aid}>
                    <div className="text content-box">
                      <div style={{ marginBottom: '30px' }}>
                        <h6>cid</h6>
                        <span>
                          <a
                            href={`https://ipfs.io/ipfs/${answer?.cid}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {answer.cid}
                          </a>
                        </span>
                      </div>
                      <div style={{ marginBottom: '30px' }}>
                        <h6>Nickname (address)</h6>
                        <span>
                          {answer.nickname} (
                          <a
                            href={`https://goerli.etherscan.io/address/${answer?.author}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {answer?.author}
                          </a>
                          )
                        </span>
                      </div>
                      <div style={{ marginBottom: '30px' }}>
                        <h6>Answer</h6>
                        <span>{answer.content}</span>
                      </div>
                    </div>
                    {isMine && !isSelected ? (
                      <button
                        onClick={(e) => {
                          onSelectAnswer(e, answer.aid, answer.qid);
                        }}
                        className="btn btn-accept btn-outline-light btn-lg px-5 text-dark "
                      >
                        Select
                      </button>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : null}

      <div className="container answer-container">
        <h3>Answer</h3>

        {answerContents.map((answer) => {
          if (answer.aid !== selectedAnswerId) {
            return (
              <div
                className="box-part"
                key={answer.aid}
                style={{ width: '100%' }}
              >
                <div className="text content-box" style={{ width: 'auto' }}>
                  <div style={{ marginBottom: '30px' }}>
                    <h6>cid</h6>
                    <span>
                      <a
                        href={`https://ipfs.io/ipfs/${answer.cid}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {answer.cid}
                      </a>
                    </span>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <h6>User (address)</h6>
                    <span>
                      {answer.nickname} (
                      <a
                        href={`https://goerli.etherscan.io/address/${answer.author}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {answer.author}
                      </a>
                      )
                    </span>
                  </div>
                  <div style={{ marginBottom: '30px', width: '100%' }}>
                    <h6>Answer</h6>
                    <p
                      style={{
                        display: 'inline-block',
                        wordBreak: 'break-word',
                        width: '100%',
                      }}
                    >
                      {answer.content}
                    </p>
                  </div>
                </div>
                {isMine && !isSelected ? (
                  <button
                    onClick={(e) => {
                      onSelectAnswer(e, answer.aid, answer.qid);
                    }}
                    className="btn btn-accept btn-outline-light btn-lg px-5 text-dark "
                  >
                    Select
                  </button>
                ) : null}
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default DetailAnswer;
