import React, { useState } from 'react';

const DetailAnswerForm = ({
  qid,
  knov1Contract,
  walletAddress,
  userNickname,
}) => {
  const [answer, setAnswer] = useState();

  const onAnswerHandler = (e) => {
    setAnswer(e.target.value);
  };

  const onAnswer = () => {
    const answerInfo = {
      author: walletAddress,
      nickname: userNickname,
      content: answer,
    };

    if (answer === '') {
      console.log('Please fill in the form');
    } else {
      console.log(answerInfo);
    }
  };

  return (
    <>
      <div>
        <div className="container answer-container">
          <h3>What's your Answer?</h3>
          <div className="input-part">
            <textarea
              type="text"
              className="form-control form-body form-content"
              id="answer"
              name="answer"
              value={answer}
              onChange={onAnswerHandler}
            />
          </div>
        </div>
        <button
          onClick={onAnswer}
          className="btn btn-answer bg-dark btn-outline-light btn-lg px-5 text-white "
        >
          Go to Answer!
        </button>
      </div>
    </>
  );
};

export default DetailAnswerForm;
