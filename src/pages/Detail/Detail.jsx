import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { movieScheduleAction } from '../../redux/action/filmAction';
import { NavLink } from 'react-router-dom';
import Moment from 'moment';

export default function Detail(props) {
    let { movieSchedule } = useSelector(state => state.filmReducer)
    let [maHeThongRap, setMaHeThongRap] = useState('');
    let [cumRapChieu, setCumRapChieu] = useState({});
    let [dateMovie, setDateMovie] = useState([]);
    let [timeMovie, setTimeMovie] = useState([]);
    let [dateActive, setdateActive] = useState(0);

    let dispatch = useDispatch();
    useEffect(() => {
        getScheduleAPI()
    }, [])

    useEffect(() => {
        if (movieSchedule.length !== 0) {
            let firstCum = movieSchedule.heThongRapChieu[0].cumRapChieu[0];
            setCumRapChieu(firstCum);
            getScheduleMovie(firstCum);
            let firstDate = Moment(firstCum.lichChieuPhim[0].ngayChieuGioChieu).format('D/MM');
            getTimeMovie(firstCum, firstDate);
        }
    }, [movieSchedule]);

    useEffect(() => {
        if (maHeThongRap !== '') {
            let cumRap = movieSchedule.heThongRapChieu.find((rap) => {
                return rap.maHeThongRap === maHeThongRap;
            })
            setCumRapChieu(cumRap.cumRapChieu[0]);
            getScheduleMovie(cumRap.cumRapChieu[0]);
            let firstDate = Moment(cumRap.cumRapChieu[0].lichChieuPhim[0].ngayChieuGioChieu).format('D/MM');
            getTimeMovie(cumRap.cumRapChieu[0], firstDate);
        }
    }, [maHeThongRap]);

    let getTimeMovie = (cum, date) => {
        let time = cum.lichChieuPhim.filter((timeM) => {
            return Moment(timeM.ngayChieuGioChieu).format('D/MM') === date;
        })
        setTimeMovie(time)
    }

    let getScheduleMovie = (cum) => {
        let schedule = []
        for (let i = 0; i < cum.lichChieuPhim.length; i++) {
            let date = Moment(cum.lichChieuPhim[i].ngayChieuGioChieu).format('D/MM')
            if (!schedule.includes(date)) {
                schedule.push(date);
            }
        }
        setDateMovie(schedule);
    }

    let renderCinema = () => {
        return movieSchedule.heThongRapChieu.map((cinema, index) => {
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


    let renderDay = () => {
        let dates = dateActive - 5 >= 0 ? dateMovie.slice(dateActive-5, dateActive + 1) : dateMovie.slice(0, 6);
        return dates.map((date, index) => {
            if (date == dateMovie[dateActive]) {
                return <li key={date} onClick={() => {
                    getTimeMovie(cumRapChieu, date);
                    setdateActive(dateMovie.indexOf(date));
                }} className="nav-item detail-date"><span className="nav-link active">{date}</span></li>
            }
            else {
                return <li key={date} onClick={() => {
                    getTimeMovie(cumRapChieu, date);
                    setdateActive(dateMovie.indexOf(date));
                }} className="nav-item detail-date"><span className="nav-link">{date}</span></li>
            }

        })
    }

    let renderTime = () => {
        return timeMovie.map((time) => {
            return <NavLink key={time.maLichChieu} className="btn btn-outline-light m-1" to={`/ticketroom/${time.maLichChieu}`}>{Moment(time.ngayChieuGioChieu).format('HH:mm:ss')}</NavLink>
        })
    }

    let renderDetail = () => {
        if (movieSchedule.length !== 0) {
            return <div className="row">
                <div className="col-4 py-2">
                    <img className='img-fluid' src={movieSchedule.hinhAnh} alt="" />
                </div>
                <div className="col-8">
                    <h3>{movieSchedule.tenPhim}</h3>
                    <div className='py-2 detail-rating'><i className="fa fa-star" aria-hidden="true" /><span className='detail-score'>{movieSchedule.danhGia}</span>/10</div>
                    <p>Ngày khởi chiếu: <span className='detail-info'>{Moment(movieSchedule.ngayKhoiChieu).format('D/MM/YYYY')}</span></p>
                    <div>
                        <ul className="nav detail_tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <span className="detail_title active" id="home-tab" data-toggle="tab" data-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Chi tiết</span>
                            </li>
                            <li className="nav-item" role="presentation">
                                <span className="detail_title" id="profile-tab" data-toggle="tab" data-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Lịch chiếu</span>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <p>{movieSchedule.moTa}</p>
                                <button className="btn detail_trailer" data-toggle="modal" data-target="#trailerModal"><i className="fa fa-caret-right" aria-hidden="true" /> Xem thử</button>
                                <button className="btn mx-3 detail_buy" data-toggle="tab" data-target="#profile" role="tab" aria-controls="profile">Mua vé ngay</button>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row">
                                    <div className="col-2 py-2">
                                        <div className="list-group" role="tablist">
                                            {renderCinema()}
                                        </div>
                                    </div>
                                    <div className="col-10 py-2">
                                        <ul className="nav justify-content-center border-bottom detail_date">
                                            <li onClick={() => {
                                                setdateActive(dateActive > 0 ? dateActive - 1: 0);
                                                getTimeMovie(cumRapChieu, dateMovie[dateActive > 0 ? dateActive - 1: 0]);
                                            }} className="nav-item detail-date">
                                                <span className="nav-link"><i className="fa fa-chevron-left" aria-hidden="true" /></span>
                                            </li>
                                            {renderDay()}
                                            <li onClick={() => {
                                                getTimeMovie(cumRapChieu, dateMovie[dateActive < dateMovie.length -1 ? dateActive + 1: dateMovie.length-1]);
                                                setdateActive(dateActive < dateMovie.length-1 ? dateActive + 1: dateMovie.length-1);
                                            }} className="nav-item detail-date">
                                                <span className="nav-link"><i className="fa fa-chevron-right" aria-hidden="true" /></span>
                                            </li>
                                        </ul>
                                        <div className='py-2 border-bottom'>
                                            <div className="row">
                                                <div className="col-4"><img className='img-fluid' src={cumRapChieu.hinhAnh} alt="" /></div>
                                                <div className="col-8"><p>{cumRapChieu.diaChi}</p></div>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <span>Thời gian chiếu:</span> {renderTime()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
    let getScheduleAPI = () => {
        let action = movieScheduleAction(props.match.params.maPhim);
        dispatch(action);
    }


    return (
        <div className='container content'>
            {renderDetail()}
            <div className="modal fade" id="trailerModal" tabIndex={-1} aria-labelledby="trailerModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="trailerModalLabel">{movieSchedule.tenPhim}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/HzUhz2XkFfE" allowFullScreen />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}