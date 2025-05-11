import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
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
          className="custom-input"
          style={{
            backgroundColor:'white',
            border: '1px solid #5C5C5C',
            borderRadius: '5px',
            width: '100%',
            height: '72px',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '150%',
            color: 'black',
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
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => {
            // Удаляем все НЕ-цифры
            const onlyNums = e.target.value.replace(/\D/g, '');
            form.setFieldsValue({ phone: onlyNums });
          }}
          style={{
            backgroundColor:'white',
            border: '1px solid #5C5C5C',
            borderRadius: '5px',
            width: '100%',
            height: '72px',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '150%',
            color: 'black',
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
        <Checkbox style={{ color: '#CBCBCB' }}>
          Я соглашаюсь с условиями <a href="#" style={{color:'#EDCB92', fontSize:'16px'}}>Политики в отношении обработки персональных данных</a>
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
            color: '#5C5C5C',
        }}>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSix;
