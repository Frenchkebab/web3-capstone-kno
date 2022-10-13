import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { limitState, pageState, viewContentState } from '../atoms';

function Board() {
  const [viewContent, setViewContent] = useRecoilState(viewContentState);
  const [limit, setLimit] = useRecoilState(limitState);
  const [page, setPage] = useRecoilState(pageState);

  const offset = (page - 1) * limit;
  const total = viewContent.length;
  const numPages = Math.ceil(total / limit);

  // useEffect(() => {
  //   Axios.get('http://localhost:8000/list').then((res) => {
  //     console.log(res.data);
  //     setViewContent(res.data);
  //   });
  // }, [setViewContent]);

  return (
    <div className="Board">
      <div className="body">
        <h2 className="main-title">Today's Question</h2>

        <div className="box">
          <div className="container">
            <div className="row">
              {viewContent.slice(offset, offset + limit).map((element) => (
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div className="box-part text-center">
                    <div className="title">
                      <h4>{element.TITLE}</h4>
                    </div>

                    <div className="text">
                      <span>{element.CONTENT}</span>
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
