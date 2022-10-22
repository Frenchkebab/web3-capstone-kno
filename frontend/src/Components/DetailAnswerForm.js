import React, { useState } from 'react';
import { uploadData } from '../Helpers/ipfs';
import { getSigner } from '../Helpers/provider';

const DetailAnswerForm = ({
  qid,
  knov1Contract,
  walletAddress,
  userNickname,
}) => {
  const [answer, setAnswer] = useState();
  const [timestamp, setTimestamp] = useState();

  const onAnswerHandler = (e) => {
    setAnswer(e.target.value);
    setTimestamp(Date.now());
  };

  const onAnswer = async () => {
    const aid = (await knov1Contract.getTotalAnswerNumber()).toNumber();

    const answerInfo = {
      type: 'Answer',
      qid,
      aid,
      author: walletAddress,
      nickname: userNickname,
      timestamp,
      content: answer,
    };

    if (answer === '') {
      console.log('Please fill in the form');
    } else {
      alert('Wait for upload...');
      //! TODO: 1) upload on ipfs
      const cid = await uploadData(answerInfo);
      console.log(cid);

      //! TOOD: 2) send this to the contract
      const signedKnoV1Contract = knov1Contract.connect(await getSigner());
      const tx = await signedKnoV1Contract.postAnswer(qid, cid);
      await tx.wait();

      alert('Successfully Posted');
      const aids = await knov1Contract.getQuestionAids(qid);
      aids.forEach((aid) => console.log(aid.toNumber()));

      setAnswer('');
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
