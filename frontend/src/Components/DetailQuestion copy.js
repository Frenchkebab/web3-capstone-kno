import React from 'react';

const DetailQuestion = ({ questionContent, isMine }) => {
  return (
    <div className="container question-container">
      <h3>Question</h3>

      {questionContent.map((element) => (
        <div className="box-part">
          <div className="title content-box">
            <h5 style={{ display: 'inline' }}>Title: </h5>
          </div>

          <div className="text content-box">
            <span>{element.content}</span>
          </div>

          {isMine ? (
            <button className="btn btn-edit btn-outline-light btn-lg px-5 text-dark ">
              Edit
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default DetailQuestion;
