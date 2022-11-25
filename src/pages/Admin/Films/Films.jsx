import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { listFilmAction, removeFilmAction } from '../../../redux/action/filmAction';
import { GP_ID } from '../../../util/setting';
import { Table } from 'antd';
import { Button, Modal, Space } from 'antd';

export default function Films() {
  let { mangPhim, resultTicket } = useSelector(state => state.filmReducer)
  console.log(mangPhim)

  let dispatch = useDispatch();
  useEffect(() => {
    getAPI()
  }, [])

  useEffect(() => {
    if (resultTicket !== '') {
      info()
    }
  }, [resultTicket])

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
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
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'Hàng động',
      dataIndex: '',
      width: '15%',
      render: (t, r) => <div>
        <button className='btn btn-info'>Sửa</button>
        <button onClick={() => {
            let action = removeFilmAction(r.maPhim);
            dispatch(action);
        }} className='btn btn-danger ml-1'>Xóa</button></div>,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  let info = () => {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>{resultTicket}</p>
        </div>
      ),
      onOk() { },
    });
  };

  let getAPI = () => {
    let action = listFilmAction(GP_ID);
    dispatch(action);
  }

  return (
        <Fragment >
          <h2 className='text-body'>Quản lý phim</h2>
          <button className="btn btn-success m-3">Thêm phim</button>
          <Table rowKey="id" columns={columns}  dataSource={mangPhim} onChange={onChange} />;
        </Fragment>
  );
};
