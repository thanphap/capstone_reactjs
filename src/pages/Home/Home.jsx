import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerFilmAction, cinemaFilmAction, cinemaScheduleAction, listFilmAction } from '../../redux/action/filmAction';
import { GP_ID } from '../../util/setting';
import { NavLink } from 'react-router-dom';
import Moment from 'moment';
import { history } from "../../App"

export default function Home() {
  let { mangBanner, mangPhim, mangCinema, cinemaSchedule } = useSelector(state => state.filmReducer);
  let [maHeThongRap, setMaHeThongRap] = useState('');
  let [cumRapChieu, setCumRapChieu] = useState({});
  

  let dispatch = useDispatch();
  useEffect(() => {
    getBannerAPI();
    getCinemaAPI();
    getListMovieAPI();
  }, [])

  useEffect(() => {
    if (maHeThongRap !== '') {
      getScheduleCinemaAPI();
    }
  }, [maHeThongRap]);

  useEffect(() => {
    if (mangCinema.length !== 0) {
        setMaHeThongRap(mangCinema[0].maHeThongRap)
    }
  }, [mangCinema]);

  useEffect(() => {
    if (cinemaSchedule.length !== 0) {
        setCumRapChieu(cinemaSchedule[0].lstCumRap[0]);
    }
  }, [cinemaSchedule]);

  let renderBannerPhim = () => {
    return mangBanner.map((banner, index) => {
      if (index == 0) {
        return <div key={banner.maPhim} className="carousel-item active">
          <NavLink to={`/detail/${banner.maPhim}`}>
            <img src={banner.hinhAnh} className="d-block w-100" alt="..." />
            <div className="slide-text">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </NavLink>
        </div>
      } else {
        return <div key={banner.maPhim} className="carousel-item">
          <NavLink to={`/detail/${banner.maPhim}`}>
            <img src={banner.hinhAnh} className="d-block w-100" alt="..." />
            <div className="slide-text">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </NavLink>
        </div>
      }

    })
  }

  let renderDotBanner = () => {
    return mangBanner.map((banner, index) => {
      if (index == 0) {
        return <li key={`dot${banner.maPhim}`} data-target="#carouselBanner" data-slide-to={index} className="owl-dot active" />
      } else {
        return <li key={`dot${banner.maPhim}`} data-target="#carouselBanner" data-slide-to={index} className="owl-dot" />
      }

    })
  }

  let renderListMovie = () => {
    let listMovie = mangPhim.filter(item => item.dangChieu == true)
    let movies = listMovie.length < 8 ? listMovie : listMovie.slice(0, 8);
    return movies.map((phim) => {
      return <div className="col-6 col-md-3 grid-item" key={phim.maPhim}>
        <div className="halim-item">
          <NavLink className="halim-thumb" to={`/detail/${phim.maPhim}`}>
            <figure>
              <img src={phim.hinhAnh} alt="..." />
            </figure>
            <div className="icon_overlay" />
            <div className="halim-post-title-box">
              <div className='halim-post-title'>
                <h2 className="">{phim.tenPhim}</h2>
                <p className=""></p>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    })
  }

  let renderComingMovie = () => {
    let comingMovie = mangPhim.filter(item => item.sapChieu == true)
    let movies = comingMovie.length < 10 ? comingMovie : comingMovie.slice(0, 10);
    return movies.map((phim) => {
      return <div className="item" key={`cm_${phim.maPhim}`}>
        <NavLink to={`/detail/${phim.maPhim}`}>
          <div className="item-link">
            <img className="blur-up post-thumb lazyloaded" src={phim.hinhAnh} alt="" />
          </div>
          <h3 className="title">{phim.tenPhim}</h3>
          <p className="original_title">Ngày khởi chiếu: {Moment(phim.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
        </NavLink>
        <div className="viewsCount">Đánh giá: {phim.danhGia}/10</div>
      </div>
    })
  }

  let renderCinema = () => {
    return mangCinema.map((cinema, index) => {
      if (index == 0) {
        return <li key={cinema.maHeThongRap} className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" role="tab" aria-controls={cinema.maHeThongRap}>
          <img onClick={() => {
            setMaHeThongRap(cinema.maHeThongRap);
          }} src={cinema.logo} className='img-fluid' alt="..." />
        </li>
      }
      else {
        return <li key={cinema.maHeThongRap} className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" role="tab" aria-controls={cinema.maHeThongRap}>
          <img onClick={() => {
            setMaHeThongRap(cinema.maHeThongRap);
          }} src={cinema.logo} className='img-fluid' alt="..." />
        </li>
      }
    })
  }

  let renderListCumRap = () => {
    if (cinemaSchedule.length > 0) {
      let cums = cinemaSchedule[0].lstCumRap.length < 6 ? cinemaSchedule[0].lstCumRap : cinemaSchedule[0].lstCumRap.slice(0, 5);
      return cums.map((cinema) => {
        return <div className="item" key={`cr_${cinema.maCumRap}`}>
          <div onClick={() => {
            setCumRapChieu(cinema);
          }}>
            <div className="item-link">
              <img className="blur-up post-thumb lazyloaded" src={cinema.hinhAnh} alt="" />
            </div>
            <h3 className="title">{cinema.tenCumRap}</h3>
            <p className="original_title">{cinema.diaChi}</p>
          </div>
        </div>
      })
    }
  }

  let getScheduleMovie = (cumSchedule) => {
    let schedule = [];
    for (let i = 0; i < cumSchedule.length; i++) {
      let valuedate = Moment(cumSchedule[i].ngayChieuGioChieu).format('D/MM')
      if (!schedule.some(item => item.date === valuedate)) {
        let newdata = {
          date : valuedate,
          maLichChieu : cumSchedule[i].maLichChieu
        };
        schedule.push(newdata);
      }
    }
    return schedule;
  }

  let listTime = (movieSchedule) => {
    let dateSchedule = getScheduleMovie(movieSchedule)
    let max = dateSchedule.length
    let arrTimes = max < 6 ? dateSchedule : dateSchedule.slice(max-5, max);
    return arrTimes.map((dates) => {
      return <NavLink key={dates.maLichChieu} to={`/ticketroom/${dates.maLichChieu}`} className="btn btn-sm btn-outline-light m-1">{dates.date}</NavLink>
    })
  }

  let renderListMovieCinema = () => {
    if (Object.keys(cumRapChieu).length !== 0) {
      return cumRapChieu.danhSachPhim.map((phim) => {
        return <div className="item" key={`crm_${phim.maPhim}`}>
          <span onClick={() => { 
            history.push(`/detail/${phim.maPhim}`);
           }}>
            <div className="item-link">
              <img className="blur-up post-thumb lazyloaded" src={phim.hinhAnh} alt="" />
            </div>
            <h3 className="title">{phim.tenPhim}</h3>
            <p className="original_title">Lịch chiếu: {listTime(phim.lstLichChieuTheoPhim)}</p>
          </span>
        </div>
      })
    }
  }

  let getBannerAPI = () => {
    let action = bannerFilmAction();
    dispatch(action);
  }

  let getCinemaAPI = () => {
    let action = cinemaFilmAction();
    dispatch(action);
  }

  let getScheduleCinemaAPI = () => {
    let action = cinemaScheduleAction(maHeThongRap);
    dispatch(action);
  }

  let getListMovieAPI = () => {
    let action = listFilmAction(GP_ID);
    dispatch(action);
  }

  return (
    <div className='container-md content'>
      <div className="row">
        <div className="col-md-12 col-lg-8" id='main__content'>
          <div id="carouselBanner" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators owl-dots">
              {renderDotBanner()}
            </ol>
            <div className="carousel-inner">
              {renderBannerPhim()}
            </div>
            <button className="carousel-control-prev owl-prev" type="button" data-target="#carouselBanner" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
            </button>
            <button className="carousel-control-next owl-next" type="button" data-target="#carouselBanner" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
            </button>
          </div>
          <div className="section-bar">
            <div className="section-title">
              <span>PHIM ĐANG CHIẾU</span>
            </div>
            <div className="row halim_box">
              {renderListMovie()}
            </div>
            <div className='text-right'>
              <NavLink to="/show" className="see-more">Xem tất cả</NavLink>
            </div>

          </div>
          <div className="section-bar">
            <div className="section-title">
              <span>RẠP CHIẾU PHIM</span>
            </div>
            <div className="row halim_rap">
              <div className="col-2 grid-rap">
                <div className="list-group" role="tablist">
                  {renderCinema()}
                </div>
              </div>
              <div className="col-10 col-sm-4 grid-rap">
                <div className="popular-post">
                  {renderListCumRap()}
                </div>
              </div>
              <div className="col-12 col-sm-6 grid-rap">
                <div className="popular-post">
                  {renderListMovieCinema()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='sidebar' className="col-md-12 col-lg-4 col-lg-4">
          <div className="section-bar">
            <div className="section-title">
              <span>PHIM SẮP CHIẾU</span>
            </div>
            <div className="tab-content">
              <div className="popular-post">
                {renderComingMovie()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
