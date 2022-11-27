import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { addFilmAction, setAlertFilmAction } from '../../../redux/action/filmAction';
import { Form, Input, Button, DatePicker, InputNumber, Switch, Upload, Modal } from 'antd';
const { TextArea } = Input;

export default function AddFilm() {
  let { arletContent } = useSelector(state => state.filmReducer)
  let [fileList, setfileList] = useState([]);

  let dispatch = useDispatch();

  useEffect(() => {
    if (arletContent !== '') {
      info()
    }
  }, [arletContent])

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
      ngayKhoiChieu: dayjs(),
      danhGia: 0,
      dangChieu: false,
      sapChieu: false,
      hot: false,
      hinhAnh: ''
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().required("Tên phim không được để trống"),
    }),
    onSubmit: values => {
      let formData = new FormData();
      for (let value in values) {
        if (value === 'ngayKhoiChieu') {
          let date = dayjs(values[value]).format('DD/MM/YYYY');
          formData.append(value, date);
        }
        else if (value === 'hinhAnh') {
          if (typeof values[value] !== 'string') {
            formData.append('File', values[value].fileList[0].originFileObj, values[value].fileList[0].name);
          }
          else {
            formData.append(value, values[value])
          }
        }
        else {
          formData.append(value, values[value]);
        }
      }
      let action = addFilmAction(formData);
      dispatch(action);
    },
  });

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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div className='p-5'>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" onFinish={formik.handleSubmit}
        initialValues={formik.values}>
        <Form.Item label="Tên phim" name="tenPhim" validateStatus="error" help={formik.touched.tenPhim && formik.errors.tenPhim ? (formik.errors.tenPhim) : null}>
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        </Form.Item>
        
        <Form.Item label="Xem thử" name="trailer">
          <Input onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả" name="moTa">
          <TextArea rows={4} onChange={formik.handleChange}/>
        </Form.Item>
        <Form.Item label="Lịch chiếu" name="ngayKhoiChieu">
          <DatePicker onChange={(date) => formik.setFieldValue('ngayKhoiChieu', date)} format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item label="Số sao" name="danhGia">
          <InputNumber min={0} max={10} onChange={(value) => formik.setFieldValue('danhGia', value)} />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked" name="dangChieu" >
          <Switch onChange={(value) => formik.setFieldValue('dangChieu', value)} />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked" name="sapChieu">
          <Switch onChange={(value) => formik.setFieldValue('sapChieu', value)} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked" name="hot">
          <Switch onChange={(value) => formik.setFieldValue('hot', value)} />
        </Form.Item>
        <Form.Item label="Hình ảnh" valuePropName="fileList">
          <Upload
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={fileList}
            onChange={(value) => {
              setfileList(value.fileList);
              formik.setFieldValue('hinhAnh', value);
            }}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button htmlType="submit">Thêm phim</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
