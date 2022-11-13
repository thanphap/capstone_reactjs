import React from 'react'

export default function Home() {

  return (
    <div className='container'>
      <div className="row">
        <div className="col-9">

          <div className="myCarousel">
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to={0} className="active" />
                <li data-target="#carouselExampleCaptions" data-slide-to={1} />
                <li data-target="#carouselExampleCaptions" data-slide-to={2} />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="https://placekitten.com/450/200" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://placekitten.com/450/200" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the second slide.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://placekitten.com/450/200" className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Some representative placeholder content for the third slide.</p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </button>
            </div>


          </div>


        </div>
        <div className="col-3">

          <div className="right-Xh">
            {/* Sidebar header  */}
            <div className="right-Xh__header d-flex justify-content-between">
              <h6 className="right-Xh__tittle">XẾP HẠNG</h6>
              <div className="right-Xh__nav">
                <ul className='list-inline'>
                  <li className='list-inline-item mr-2'>Ngày</li>
                  <li className='list-inline-item mr-2'>Tuần</li>
                  <li className='list-inline-item mr-2'>Tháng</li>
                  <li className='list-inline-item mr-2'>Tất cả</li>
                </ul>
              </div>
            </div>
            {/* Sidebar movie content  */}
            <div className="right-Xh__mvWrap">
              <ul className='list-unstyled'>
                <li>
                  <img className='rightSi__img' src="https://hoathinh3d.com/wp-content/uploads/2022/09/dau-pha-thuong-khung-phan-5-gia-nam-hoc-vien-1321-300x450.jpg" alt="" />
                  <div className="rightSi__content">
                    <ul className='list-unstyled'>
                      <li className='rightSi__mvName'>Đấu Phá Thương Khung Phần 5</li>
                      <li className='rightSi__mvEngName'>Fights Break Sphere 5</li>
                      <li className='rightSi__view'>4.2K lượt xem</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Top phim le  */}
          <div className="right-topPL">
            <h6 className="right-topPL__tittle">TOP PHIM LẺ</h6>

          </div>


        </div>
      </div>
    </div>
  )
}
