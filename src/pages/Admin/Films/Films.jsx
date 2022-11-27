import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listFilmAction, removeFilmAction, setAlertFilmAction } from '../../../redux/action/filmAction';
import { GP_ID } from '../../../util/setting';
import { history } from "../../../App"
import { Table, Modal } from 'antd';

export default function Films() {
  let { mangPhim, arletContent } = useSelector(state => state.filmReducer)
  let dispatch = useDispatch();
  useEffect(() => {
    getFilmsAPI()
  }, [])

  useEffect(() => {
    if (arletContent !== '') {
      info()
    }
  }, [arletContent])

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      width: '10%',
      render: (t, r) => <img className='img-fluid' src={`${r.hinhAnh}`} alt="" />
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
    },
    {
      title: 'Hàng động',
      dataIndex: '',
      width: '15%',
      render: (t, r) => <div>
        <button onClick={() => {
          history.push(`/admin/editfilm/${r.maPhim}`);
        }} className='btn btn-info'>Sửa</button>
        <button onClick={() => {
          let action = removeFilmAction(r.maPhim);
          dispatch(action);
        }} className='btn btn-danger ml-1'>Xóa</button></div>,
    },
  ];

  let info = () => {
    Modal.info({
      title: 'Thông báo',
      content: (
        <div>
          <p>{arletContent}</p>
        </div>
      ),
      onOk() {
        let action = setAlertFilmAction('');
        dispatch(action);
      },
    });
  };

  let getFilmsAPI = () => {
    let action = listFilmAction(GP_ID);
    dispatch(action);
  }

  return (
    <Fragment >
      <h2 className='text-body'>Quản lý phim</h2>
      <button onClick={() => {
        history.push('/admin/addfilm');
      }} className="btn btn-success m-3">Thêm phim</button>
      <Table rowKey='maPhim' columns={columns} dataSource={mangPhim}/>;
    </Fragment>
  );
};
