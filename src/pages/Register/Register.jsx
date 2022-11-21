import React from 'react';
import { useFormik } from 'formik';
import { GP_ID } from '../../util/setting';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../redux/action/userAction';
import { history } from "../../App"
import { NavLink } from 'react-router-dom';

export default function Register() {
  let { alertRegister } = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      hoTen: '',
      maNhom: GP_ID
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Tài khoản không được để trống"),
      matKhau: Yup.string().required("Mật khẩu không được để trống"),
      email: Yup.string().required("Email không được để trống").email("Email chưa đúng định dạng"),
      hoTen: Yup.string().required("Họ tên không được để trống").matches(/^[A-Z a-z]+$/, "Họ tên không đúng định dạng")
    }),
    onSubmit: values => {
      console.log(values)
      let action = registerAction(values);
      dispatch(action);
    },
  });
  return (
    <div className='py-5'>
      <h2>Đăng ký thành viên</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <input name="taiKhoan" type="text" className="form-control" placeholder="Tài khoản" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.taiKhoan} />
          {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
            <div className='alert alert-danger'>{formik.errors.taiKhoan}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input name="matKhau" type="password" className="form-control" placeholder="Mật khẩu" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.matKhau} />
          {formik.touched.matKhau && formik.errors.matKhau ? (
            <div className='alert alert-danger'>{formik.errors.matKhau}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input name="hoTen" type="text" className="form-control" placeholder="Họ tên" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.hoTen} />
          {formik.touched.hoTen && formik.errors.hoTen ? (
            <div className='alert alert-danger'>{formik.errors.hoTen}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input name="soDt" type="text" className="form-control" placeholder="Số điện thoại" onChange={formik.handleChange} value={formik.values.soDt} />
        </div>
        <div className="form-group">
          <input name="email" type="text" className="form-control" placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.touched.hoTen && formik.errors.email ? (
            <div className='alert alert-danger'>{formik.errors.email}</div>
          ) : null}
        </div>
        <button type='button' className='btn btn-danger' data-toggle="modal" data-target="#registerModal">Đăng ký</button>
        <NavLink className='btn btn-success mx-3' to='/login'>Đăng nhập</NavLink>
      </form>
      <div className="modal fade" id="registerModal" tabIndex={-1} aria-labelledby="registerModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">Thông báo</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {alertRegister}
            </div>
            <div className="modal-footer">
              <button onClick={() => { 
                history.push('/login');
               }} className="btn btn-primary" data-dismiss="modal">Đăng nhập</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
