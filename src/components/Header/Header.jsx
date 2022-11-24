import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/action/userAction'
import LogoImg from "../../asset/img/logo.svg";

export default function Header() {
  let { uLogin } = useSelector(state => state.userReducer)
  let dispatch = useDispatch();
  let renderUser = () => {
    if (uLogin != null) {
      return <div className="dropdown text-right ">
        <div className="dropdown-toggle ml-2" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-user-circle mx-1" aria-hidden="true" />{uLogin.hoTen}</div>
        <div className="dropdown-menu">
          <NavLink className="dropdown-item" to="/profile">Thông tin cá nhân</NavLink>
          <button onClick={() => {
            let action = logoutAction();
            dispatch(action);
          }} className="dropdown-item">Đăng xuất</button>
        </div>
      </div>
    }
  }
  let renderLogin = () => {
    if (uLogin == null) {
      return <Fragment>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Đăng nhập</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Đăng ký</NavLink>
        </li>
      </Fragment>
    }
    else{
      return <li className="nav-item">
          <NavLink className="nav-link" to="/admin"><i className="fa fa-lock" aria-hidden="true" /> Quản lý</NavLink>
      </li>
    }
  }

  return (
    <header>
      <div className="container">{renderUser()}</div>
      <div className="menu">
        <div className="container">
          <nav className="navbar navbar-expand-lg p-0">
            <NavLink className="navbar-brand" to="/home"><img src={LogoImg} alt="" /><span className="title_logo">PHIM HAY</span> </NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fa fa-bars" aria-hidden="true" />
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home"><i className="fa fa-home" aria-hidden="true" /> Trang chủ</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/show"><i className="fa fa-check-circle-o" aria-hidden="true" /> Phim đang chiếu</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/coming"><i className="fa fa-clock-o" aria-hidden="true" /> Phim sắp chiếu</NavLink>
                </li>
                {renderLogin()}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
