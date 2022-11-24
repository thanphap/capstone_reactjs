import React from 'react'
import { NavLink } from 'react-router-dom'
import LogoImg from "../../asset/img/logo.svg";

export default function Footer() {
  return (
    <footer>
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-6 py-3">
            <ul>
              <li><NavLink className="logo" to="/home"><img src={LogoImg} alt="" /><span className="title_logo">PHIM HAY</span> </NavLink></li>
              <li>Địa chỉ: 136 Phạm Văn Đồng, Sơn Trà, Đà Nẵng</li>
              <li>Số điện thoại: 09047657368</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 py-3">
            <div className="row">
              <div className="col-6">
                <h5>Quy định</h5>
                <ul>
                  <li>Điều khoản chung</li>
                  <li>Chính sách riêng tư</li>
                  <li>Bảo mật</li>
                </ul>
              </div>
              <div className="col-6">
                <h5>Trợ giúp</h5>
                <ul>
                  <li>Trung tâm hổ trợ </li>
                  <li>Liên hệ</li>
                  <li>Góp ý</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
