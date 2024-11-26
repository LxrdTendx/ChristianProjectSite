import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import '../App.css';

const FormSix = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Полученные значения формы: ', values);
  };

  return (
    <Form
      form={form}
      name="custom_form"
      onFinish={onFinish}
      style={{
        marginTop: '15px',
        maxWidth: '840px',
      }}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите ваше имя',
          },
        ]}
      >
        <Input
          placeholder="Имя"
          style={{
            backgroundColor:'black',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '5px',
            width: '100%',
            height: '72px',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '150%',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите ваш номер телефона',
          },
          {
            pattern: /^\d+$/,
            message: 'Номер телефона должен содержать только цифры',
          },
        ]}
      >
        <Input
          placeholder="Номер телефона"
          style={{
            backgroundColor:'black',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '5px',
            width: '100%',
            height: '72px',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '150%',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Необходимо согласиться с условиями')),
          },
        ]}
      >
        <Checkbox style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Я соглашаюсь с условиями <a href="#" style={{color:'#bda57e', fontSize:'16px'}}>Политики в отношении обработки персональных данных</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit"
        style={{
            borderRadius: '5px',
            padding: '20px 34px',
            width: '100%',
            height: '72px',
            background: '#bda57e',
            fontFamily: "Manrope",
            fontWeight: '500',
            fontSize: '20px',
            lineHeight: '150%',
            color: '#fff',
        }}>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSix;
