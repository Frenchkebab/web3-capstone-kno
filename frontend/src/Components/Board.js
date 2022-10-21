import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  limitState,
  pageState,
  totalQuestionNumState,
  viewContentState,
} from '../atoms';
import { useKNOV1Contract } from '../Context/KNOV1Context';

function Board() {
  // contract
  const { knov1Contract } = useKNOV1Contract();

  // Total Question
  const [totalQuestionNum, setTotalQuestionNum] = useRecoilState(
    totalQuestionNumState
  );

  // UI
  const [viewContent, setViewContent] = useRecoilState(viewContentState);
  const [cids, setCids] = useState([]);
  const [limit, setLimit] = useRecoilState(limitState);
  const [page, setPage] = useRecoilState(pageState);

  const offset = (page - 1) * limit;
  const total = viewContent.length;
  const numPages = Math.ceil(total / limit);

  // update total question number
  useEffect(() => {
    const getTotalQuestionNum = async () => {
      const num = (await knov1Contract.getTotalQuestionNumber()).toNumber();
      console.log('total Questoin number: ', num);
      setTotalQuestionNum(num);
    };

    getTotalQuestionNum();
  });

  useEffect(() => {
    const cids = [];

    (async () => {
      // fetch all questions' cids
      for (let qid = totalQuestionNum - 1; qid >= 0; qid--) {
        const cid = await knov1Contract.getQuestionCid(qid);
        cids.push(cid);
        console.log(cids);
      }

      const urls = cids.map((cid) => `https://ipfs.io/ipfs/${cid}`);
      const contents = [];

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
      setViewContent(contents);
    })();
  }, [totalQuestionNum]);

  return (
    <div className="Board">
      <div className="body">
        <h2 className="main-title">Questions</h2>

        <div className="box">
          <div className="container">
            <div className="row">
              {viewContent.slice(offset, offset + limit).map((element) => (
                <div
                  className="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                  style={{ width: '300px' }}
                  key={element.content}
                >
                  <div className="box-part text-center">
                    <div className="title" style={{ fontSize: '10px' }}>
                      <h4
                        style={{ overflow: 'hidden' }}
                      >{`${element.title.slice(0, 20)} ...`}</h4>
                    </div>

                    <div className="text">
                      <span
                        style={{
                          display: 'inline-block',
                          textOverflow: 'hidden',
                        }}
                      >
                        {`${element.content.slice(0, 30)}...`}
                      </span>
                    </div>

                    <Link to={`/detail/${element.idpost}`}>Read More</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <button
                className="page-item page-link"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                &lt;
              </button>

              {Array(numPages)
                .fill()
                .map((_, i) => (
                  <button
                    className="page-item page-link"
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    aria-current={page === i + 1 ? 'page' : null}
                  >
                    {i + 1}
                  </button>
                ))}

              <button
                className="page-item page-link"
                onClick={() => setPage(page + 1)}
                disabled={page === numPages}
              >
                &gt;
              </button>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Board;
