import React, { Fragment, useState } from 'react'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/action/userAction';
import { NavLink } from 'react-router-dom';

export default function Login() {
  let { alertLogin } = useSelector(state => state.userReducer)
  let dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: ''
    },
    onSubmit: values => {
      console.log(values);
      let action = loginAction(values);
      dispatch(action);
    },
  });

  return (
    <Fragment>
      <form className="form login" onSubmit={formik.handleSubmit}>
        <div className="form__field">
          <label htmlFor="taiKhoan">
            <span className="hidden">Tài khoản</span>
            <i className="fa fa-user icon" aria-hidden="true" />
          </label>
          <input onChange={formik.handleChange} name="taiKhoan" type="text" className="form__input" placeholder="Nhập tài khoản" required />
        </div>
        <div className="form__field">
          <label htmlFor="matKhau">
            <i className="fa fa-lock icon" aria-hidden="true" />
            <span className="hidden">Mật khẩu</span>
          </label>
          <input onChange={formik.handleChange} name="matKhau" type="password" className="form__input" placeholder="Nhập mật khẩu" required />
        </div>
        <div className="form__field">
          <input type="submit" value="Đăng nhập" />
        </div>
      </form>
      <p className="text--center">Bạn chưa là thành viên?<NavLink to="/register">Đăng ký ngay</NavLink>
        <i className="fa fa-arrow-right icon" aria-hidden="true" />
      </p>
      <div className="modal fade" id="loginModal" tabIndex={-1} aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog" id='openModal' data-toggle="modal" data-target="#loginModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Thông báo</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {alertLogin}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
