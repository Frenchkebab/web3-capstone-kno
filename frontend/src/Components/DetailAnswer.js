import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    console.log(isMine);
    console.log(isSelected);
  });

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
      const urls = cids.map((cid) => `https://ipfs.io/ipfs/${cid}`);
      for (let url of urls) {
        try {
          const response = await axios.get(url);
          const responseData = response.data;
          console.log('response: ', responseData);
          contents.push(responseData);
        } catch (err) {
          console.log(err);
        }
      }

      const temp = contents.map((answer) => answer.aid);
      console.log('temp!!!: ', temp);

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
    alert('answer selected!');
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
                        <h6>AnswerId</h6>
                        <span>{answer.aid}</span>
                      </div>
                      <div style={{ marginBottom: '30px' }}>
                        <h6>User (address)</h6>
                        <span>
                          {answer.nickname} ({answer.author})
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
              <div className="box-part" key={answer.aid}>
                <div className="text content-box">
                  <div style={{ marginBottom: '30px' }}>
                    <h6>AnswerId</h6>
                    <span>{answer.aid}</span>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <h6>User (address)</h6>
                    <span>
                      {answer.nickname} ({answer.author})
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
    </>
  );
};

export default DetailAnswer;
