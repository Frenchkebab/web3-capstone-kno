import React from 'react';

const DetailQuestion = ({ questionContent }) => {
  return (
    <div className="container question-container">
      <h3>Question</h3>

      <div className="box-part">
        <div className="title content-box">
          <h5>Title</h5>
          <span>{questionContent?.title}</span>
        </div>

        <div className="text content-box">
          <h6>Nickname (Address)</h6>
          <span>
            {questionContent?.nickname} ({questionContent?.author})
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
