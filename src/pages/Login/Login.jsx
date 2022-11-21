import React, { useState } from 'react'
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
    <div className="py-5">
      <h2>Đăng nhập</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <input onChange={formik.handleChange} name="taiKhoan" type="text" className="form-control" placeholder="Enter Username" />
        </div>
        <div className="form-group">
          <input onChange={formik.handleChange} name="matKhau" type="password" className="form-control" placeholder="Enter Pass" />
        </div>
        <button className='btn btn-success'>Đăng nhập</button>
        <NavLink className='btn btn-danger mx-3' to="/register">Đăng ký</NavLink>
      </form>
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
    </div>
  )
}
