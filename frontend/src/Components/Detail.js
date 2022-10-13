import Axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  acceptedAnswerState,
  acceptedState,
  isConnectedState,
  isMineState,
  userState,
  authorState,
  questionContentState,
  answerContentState,
  answerState,
} from '../atoms';
import { useParams } from 'react-router-dom';

function Detail() {
  const { idpost } = useParams();
  const [isConnected, setIsConnected] = useRecoilState(isConnectedState);
  const [isMine, setIsMine] = useRecoilState(isMineState);
  const [user, setUser] = useRecoilState(userState);
  const [author, setAuthor] = useRecoilState(authorState);
  const [isAccepted, setIsAccepted] = useRecoilState(acceptedState);
  const [questionContent, setQuestionContent] =
    useRecoilState(questionContentState);
  const [answerContent, setAnswerContent] = useRecoilState(answerContentState);
  const [answer, setAnswer] = useRecoilState(answerState);
  const [acceptedAnswer, setAcceptedAnswer] =
    useRecoilState(acceptedAnswerState);

  const onAccept = (e, answerId, postId) => {
    const postIdInfo = {
      postId,
    };

    const answerIdInfo = {
      answerId,
    };

    Axios.post('http://localhost:8000/accept/post', postIdInfo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.error(e);
      });

    Axios.post('http://localhost:8000/accept/answer', answerIdInfo)
      .then((res) => {
        console.log(res.data);
        document.location.href = `/detail/${idpost}`;
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onAnswerHandler = (e) => {
    setAnswer(e.target.value);
  };

  const onAnswer = () => {
    const answerInfo = {
      answer,
      idpost,
    };

    if (answer === '') {
      console.log('내용을 다 입력해주십시오.');
    } else {
      console.log(answerInfo);
      Axios.post('http://localhost:8000/post/answer', answerInfo)
        .then((res) => {
          console.log(res);
          document.location.href = `/detail/${idpost}`;
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  useEffect(() => {
    Axios.get(`http://localhost:8000/answer/${idpost}`).then((res) => {
      setAnswerContent(res.data);
    });
  }, [setAnswerContent, idpost]);

  useEffect(() => {
    Axios.get(`http://localhost:8000/question/${idpost}`).then((res) => {
      setQuestionContent(res.data);
      setAuthor(res.data[0].AUTHOR);
      setIsAccepted(res.data[0].ACCEPTED);

      console.log(author);
      console.log(res.data[0].AUTHOR);
    });
  }, [setQuestionContent, setAuthor, setIsAccepted, author, idpost]);

  useEffect(() => {
    Axios.get(`http://localhost:8000/accept/answer/${idpost}`).then((res) => {
      setAcceptedAnswer(res.data);
    });
  }, [setAcceptedAnswer, idpost]);

  useEffect(() => {
    if (sessionStorage.getItem('user_id') === null) {
      setIsConnected(false);
      setUser('');
      setIsMine(false);
    } else {
      setIsConnected(true);
      setUser(sessionStorage.getItem('user_id'));
      if (user === author) {
        setIsMine(true);
      } else {
        setIsMine(false);
      }
    }
  }, [setIsConnected, setUser, setIsMine, user, author, isMine]);

  return (
    <div className="Detail">
      <div className="body">
        <div className="box">
          <div className="container question-container">
            <h3>Question</h3>

            {questionContent.map((element) => (
              <div className="box-part">
                <div className="title content-box">
                  <h5>{element.TITLE}</h5>
                </div>
                <div className="text content-box">
                  <span>{element.CONTENT}</span>
                </div>
                {isMine ? (
                  <button className="btn btn-edit btn-outline-light btn-lg px-5 text-dark ">
                    Edit
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          {isAccepted ? (
            <div className="container answer-container">
              {acceptedAnswer.map((element) => (
                <div>
                  <h3>Accepted Answer</h3>
                  <div className="box-part">
                    <div className="text content-box">
                      <span>{element.ANSWER}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="container answer-container">
            <h3>Answer</h3>

            {answerContent.map((element) => (
              <div className="box-part">
                <div className="text content-box">
                  <span>{element.ANSWER}</span>
                </div>
                {isMine && !isAccepted ? (
                  <button
                    onClick={(e) => {
                      onAccept(e, element.idanswer, element.idpost);
                    }}
                    className="btn btn-accept btn-outline-light btn-lg px-5 text-dark "
                  >
                    Accept
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          {!isMine && isConnected && !isAccepted ? (
            <div>
              <div className="container answer-container">
                <h3>What's your Answer?</h3>
                <div className="input-part">
                  <input
                    type="text"
                    readonly
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
        </div>
      </div>
    </div>
  );
}

export default Detail;
