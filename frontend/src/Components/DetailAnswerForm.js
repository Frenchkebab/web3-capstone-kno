import React, { useState } from 'react';
import { useKNOV1Contract } from '../Context/KNOV1Context';
import { useWallet } from '../Context/WalletContext';

const DetailAnswerForm = ({
  qid,
  knov1Contract,
  walletAddress,
  userNickname,
}) => {
  const [answer, setAnswer] = useState;

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
      console.log('내용을 다 입력해주십시오.');
    } else {
      console.log(answerInfo);
      // Axios.post('http://localhost:8000/post/answer', answerInfo)
      //   .then((res) => {
      //     console.log(res);
      //     document.location.href = `/detail/${qid}`;
      //   })
      //   .catch((e) => {
      //     console.error(e);
      //   });
    }
  };

  return (
    <>
      <div>
        <div className="container answer-container">
          <h3>What's your Answer?</h3>
          <div className="input-part">
            <input
              type="text"
              readOnly
              className="form-control form-body form-content"
              id="answer"
              name="answer"
              value={answer}
              onChange={onAnswerHandler}
            ></input>
          </div>
        </div>
        <button
          onClick={onAnswer}
          className="btn btn-answer bg-dark btn-outline-light btn-lg px-5 text-white "
        >
          Go to Answer!
        </button>
      </div>
      ) : null}
    </>
  );
};

export default DetailAnswerForm;
