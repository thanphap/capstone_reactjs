import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addChairAction, listChairAction, oderChairAction, removeChairAction } from '../../redux/action/filmAction';
import { history } from "../../App"
import "./ticketRoom.css"

export default function Ticketroom(props) {
  let { uLogin } = useSelector(state => state.userReducer)
  let { mangGhe, cvmGhe, resultTicket } = useSelector(state => state.filmReducer);
  let [tongTien, setTongTien] = useState(0);
  let [dsGhe, setDsGhe] = useState([]);
  let dispatch = useDispatch()

  useEffect(() => {
    if (uLogin != null) {
      listChairAPI();
    } else {
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    if (resultTicket !== '') {
      setTongTien(0);
      setDsGhe([]);
      listChairAPI();
    }
  }, [resultTicket]);

  let renderChair = (chair, index) => {
    let classChange = '';
    if (chair.daDat) {
      classChange = 'gheDuocChon';
    }
    else if (chair.order) {
      classChange = 'gheDangChon';
    }
    else {
      classChange = chair.loaiGhe == 'Vip' ? 'gheVip' : 'gheThuong';
    }
    return <button onClick={() => {
      if (classChange != "gheDuocChon" && classChange != "gheDangChon") {
        setTongTien(tongTien + chair.giaVe);
        setDsGhe([...dsGhe,{soGhe:chair.tenGhe}]);
        let action = addChairAction(chair);
        dispatch(action);
      }
    }} className={`ghe ${classChange}`}>{((index + 1) < 10 ? '0' : '') + (index + 1)} </button>
  }
  
  let renderChairList = () => {
    return cvmGhe.map((chairs) => {
      return <div className='row align-items-center row__chair' key={chairs.hang}>
        <div className='col-1 firstChar'>{chairs.hang}</div>
        <div className='col-11 row col__chair'>
        {chairs.danhSachGhe.map((chair, index) => {
          return <div className='col-2 col-sm-1 col-md point' key={chair.tenGhe}>
            {renderChair(chair, index)}
          </div>
        })}
        </div>
      </div>
    })
  }

  let renderTicket = () => {
    return <tbody>
      {cvmGhe.map((chairs) => {
        return chairs.danhSachGhe.map((chair) => {
          if (chair.order) {
            return <tr key={`ticket-${chair.tenGhe}`} className='text-warning'>
              <td>{chair.tenGhe}</td>
              <td>{chair.giaVe}</td>
              <td><button onClick={() => {
                setTongTien(tongTien - chair.giaVe);
                setDsGhe(dsGhe.filter(item => item.soGhe !== chair.tenGhe));
                let action = removeChairAction(chair);
                dispatch(action);
              }} className='bg-transparent text-danger border-0'>X</button></td>
            </tr>
          }
        })
      })}
      <tr>
        <td className='text-white'>Tổng tiền</td>
        <td className='text-warning'>{tongTien}</td>
        <td></td>
      </tr>
    </tbody>
  }
<Fragment></Fragment>
  let renderContent = () => {
    if (mangGhe.length !== 0) {
      return <Fragment>
        <div className="row">
          <div className="col-12 col-xl-8 px-3">
            <h5 className='text-warning'>Cụm chiếu: {mangGhe.thongTinPhim.tenCumRap} - {mangGhe.thongTinPhim.tenRap}</h5>
            <p className='text-white mb-0 text-center'>Màn hình</p>
            <div className='screen'>
            </div>
            <div className='mx-auto'>
              {renderChairList()}
            </div>
          </div>
          <div className="col-12 col-xl-4 px-3">
            <h3 className='text-center my-4'>Danh sách ghế bạn chọn</h3>
            <div className='text-left'>
              <div><button className='ghe gheDuocChon'></button><span className='text-white'> Ghế đã đặt</span></div>
              <div><button className='ghe gheDangChon'></button><span className='text-white'> Ghế bạn chọn</span></div>
              <div><button className='ghe gheThuong'></button><span className='text-white'> Ghế chưa đặt</span></div>
              <div><button className='ghe gheVip'></button><span className='text-white'> Ghế vip</span></div>
            </div>
            <div className='text-center'>
              <h3>{mangGhe.thongTinPhim.tenPhim}</h3>
              <table className='table table-bordered'>
                <thead>
                  <tr className='text-white'>
                    <th>Số ghế</th>
                    <th>Giá</th>
                    <th>Hủy</th>
                  </tr>
                </thead>
                {renderTicket()}
              </table>
              <button className='btn detail_buy' data-toggle="modal" data-target="#datveModal">Đặt vé</button>
            </div>
          </div>
        </div>
        <div className="modal fade" id="datveModal" tabIndex={-1} aria-labelledby="exampleModalLabel1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content text-black">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel1">Thông tin đặt vé</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p><span className='modal-key'>Tên Phim: </span> {mangGhe.thongTinPhim.tenPhim}</p>
                <p><span className='modal-key'>Cụm chiếu: </span> {mangGhe.thongTinPhim.tenCumRap} - {mangGhe.thongTinPhim.tenRap}</p>
                <p><span className='modal-key'>Giờ chiếu: </span> {mangGhe.thongTinPhim.gioChieu} - {mangGhe.thongTinPhim.ngayChieu}</p>
                <p><span className='modal-key'>Địa chỉ: </span> {mangGhe.thongTinPhim.diaChi}</p>
                <p><span className='modal-key'>Ghế đã đặt: </span>{dsGhe.map((soGhes) => <span className='modal-value' key={soGhes.soGhe}>{soGhes.soGhe}; </span>)}</p>
                <p><span className='modal-key'>Tổng tiền: </span><span className='modal-value'>{tongTien}vnd</span></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Trở lại</button>
                <button onClick={() => {
                  let arr = []
                  cvmGhe.map((chairs) => {
                    chairs.danhSachGhe.map((chair) => {
                      if (chair.order) {
                        arr.push({
                          "maGhe": chair.maGhe,
                          "giaVe": chair.giaVe
                        });}
                    })})
                  let ticketChair = {
                    "maLichChieu": mangGhe.thongTinPhim.maLichChieu,
                    "danhSachVe": arr
                  }
                  let action = oderChairAction(ticketChair);
                  dispatch(action);
                }} type="button" className="btn btn-primary" data-dismiss="modal">Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="xacnhanModal" tabIndex={-1} aria-labelledby="exampleModalLabel2" aria-hidden="true">
          <div className="modal-dialog" id="openAlert" data-toggle="modal" data-target="#xacnhanModal">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel2">Thông báo</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {resultTicket}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    }
  }

  let listChairAPI = () => {
    let action = listChairAction(props.match.params.maLichChieu)
    dispatch(action)
  }

  return (
    <div className='container-md content bookingMovie py-3'>{renderContent()}</div>
  )
}
