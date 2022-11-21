import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
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
  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      danhGia: 0,
      dangChieu: false,
      sapChieu: false,
      hot: false,
      hinhAnh:''
    },
    onSubmit: values => {
      console.log(values);
      // let action = addFilmAction(values);
      // dispatch(action);
    },
  });

  return (
    <div className='p-5'>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}>
        <Form.Item  label="Tên phim">
          <Input onChange={formik.handleChange} name="tenPhim"/>
        </Form.Item>
        <Form.Item  label="Xem thử">
          <Input onChange={formik.handleChange} name="trailer"/>
        </Form.Item>
        <Form.Item  label="Mô tả">
          <Input onChange={formik.handleChange} name="moTa"/>
        </Form.Item>
        <Form.Item  label="Lịch chiếu">
          <DatePicker onChange={(value) => formik.setFieldValue('ngayKhoiChieu',value)} name="ngayKhoiChieu"/>
        </Form.Item>
        <Form.Item  label="Số sao">
          <InputNumber onChange={(value) => formik.setFieldValue('danhGia',value)} name="danhGia"/>
        </Form.Item>
        <Form.Item   label="Đang chiếu" valuePropName="checked">
          <Switch onChange={(value) => formik.setFieldValue('dangChieu',value)} name="dangChieu" />
        </Form.Item>
        <Form.Item  label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={(value) => formik.setFieldValue('sapChieu',value)} name="sapChieu"/>
        </Form.Item>
        <Form.Item  label="Hot" valuePropName="checked">
          <Switch onChange={(value) => formik.setFieldValue('hot',value)} name="hot"/>
        </Form.Item>
        <Form.Item label="Hình ảnh" valuePropName="fileList">
          <Upload onChange={(value) => formik.setFieldValue('hinhAnh',value)} listType="picture-card">
            <div>
              <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
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
