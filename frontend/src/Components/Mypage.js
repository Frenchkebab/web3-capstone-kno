function Mypage() {
  return (
    <div className="Mypage">
      <section className="vh-100 gradient-custom body">
        <div className="container py-5">
          <div className="box">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <h2 className="fw-bold mb-2 text-center">My Information</h2>
              <div className="inform-card col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-white text-black">
                  <div className="card-body p-5">
                    <div className="row mypage-row">
                      <div className="col fw-bold">Coin: </div>
                      <div className="col-8">1234567</div>
                    </div>

                    <div className="row mypage-row">
                      <div className="col fw-bold">Address: </div>
                      <div className="col-8">
                        0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
                      </div>
                    </div>

                    <div className="row mypage-row">
                      <div className="col fw-bold">Name: </div>
                      <div className="col-8">Hyewon</div>
                    </div>

                    <div className="row mypage-row">
                      <div className="col fw-bold">Email: </div>
                      <div className="col-8">gpdnjs2116@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Mypage;
