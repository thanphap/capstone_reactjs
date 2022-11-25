import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Switch,
  Upload,
} from 'antd';
import { addFilmAction } from '../../../redux/action/filmAction';

export default function AddFilm() {
  let dispatch = useDispatch();
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      maNhom: 'GP07',
      ngayKhoiChieu: '',
      danhGia: 0,
      dangChieu: false,
      sapChieu: false,
      hot: false,
      hinhAnh: ''
    },
    onSubmit: values => {
      let formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
        console.log(values[value])
        if (value === 'hinhAnh') {
          formData.append('File', values[value].fileList[0].originFileObj, values[value].fileList[0].name);
        }

      }
      let action = addFilmAction(formData);
      dispatch(action);
    },
  });

  return (
    <div className='p-5'>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}>
        <Form.Item label="Tên phim">
          <Input onChange={formik.handleChange} name="tenPhim"/>
          {/* <Input onChange={formik.handleChange} name="tenPhim" value="123"/> */}
        </Form.Item>
        <Form.Item label="Xem thử">
          <Input onChange={formik.handleChange} name="trailer" />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input onChange={formik.handleChange} name="moTa" />
        </Form.Item>
        <Form.Item label="Lịch chiếu">
          <DatePicker onChange={(date, dateString) => formik.setFieldValue('ngayKhoiChieu', dateString)} name="ngayKhoiChieu" format="DD/MM/YYYY"/>
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber onChange={(value) => formik.setFieldValue('danhGia', value)} name="danhGia" />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={(value) => formik.setFieldValue('dangChieu', value)} name="dangChieu" />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={(value) => formik.setFieldValue('sapChieu', value)} name="sapChieu" checked={true}/>
          {/* <Switch onChange={(value) => formik.setFieldValue('sapChieu', value)} name="sapChieu" checked={true}/> */}
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={(value) => formik.setFieldValue('hot', value)} name="hot" />
        </Form.Item>
        <Form.Item label="Hình ảnh" valuePropName="fileList">
          <Upload customRequest={dummyRequest} onChange={(value) => formik.setFieldValue('hinhAnh', value)} maxCount="1" listType="picture-card">
            <div>
              <PlusOutlined/> <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button htmlType="submit">Thêm phim</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
