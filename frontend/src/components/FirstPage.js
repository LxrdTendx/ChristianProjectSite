import React, { useState } from 'react';
import '../App.css';
import logo from '../assets/logo.png'; // Импорт логотипа
import { MenuOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { Button, Drawer, BackTop } from 'antd';
import { Link } from 'react-scroll'; // Импортируем Link из react-scroll

const FirstPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Показать Drawer
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  // Скрыть Drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div className='firstpage'>
      {/* Хедер */}
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav className="nav">
          <Link
            to="second-page"
            smooth={true}
            duration={500}
            className="nav-button"
          >
            о монастыре
          </Link>
          <Link
            to="fifth-page"
            smooth={true}
            duration={500}
            className="nav-button"
          >
            услуги
          </Link>
          <Link
            to="third-page"
            smooth={true}
            duration={500}
            className="nav-button"
          >
            о настоятеле
          </Link>
          <Link
            to="seven-page"
            smooth={true}
            duration={500}
            className="nav-button"
          >
            контакты
          </Link>
        </nav>
        <div className="contact-button-container">
          <button className="contact-button">cвязаться с нами</button>
        </div>

        {/* Кнопка бургер-меню */}
        <Button
          className="menu-button"
          type="text"
          icon={<MenuOutlined style={{ fontSize: '24px' }} />}
          onClick={showDrawer}
        />
      </header>

      <hr />

      {/* Drawer для мобильного меню */}
      <Drawer
        style={{ backgroundColor: 'black' }}
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible} // Используем open вместо visible начиная с Ant Design 4.20.0
      >
        <div className="drawer-menu">
          <Link
            to="second-page"
            smooth={true}
            duration={500}
            className="nav-button"
            onClick={closeDrawer}
          >
            о монастыре
          </Link>
          <Link
            to="fifth-page"
            smooth={true}
            duration={500}
            className="nav-button"
            onClick={closeDrawer}
          >
            услуги
          </Link>
          <Link
            to="third-page"
            smooth={true}
            duration={500}
            className="nav-button"
            onClick={closeDrawer}
          >
            о настоятеле
          </Link>
          <Link
            to="seven-page"
            smooth={true}
            duration={500}
            className="nav-button"
            onClick={closeDrawer}
          >
            контакты
          </Link>
          <Link
            to="contact-form"
            smooth={true}
            duration={500}
            className="contact-button"
            onClick={closeDrawer}
          >
            связаться с нами
          </Link>
        </div>
      </Drawer>

      <div className='title-page-block'>
        <div className='title-page'>
          Дом святителя Николая
        </div>
        <div className='subtitle-page'>
        «Весь еси‌ всем вои‌стину помо‌щник, богоно‌се Нико‌лае, я‌ко свободи‌тель, пита‌тель и врач ско‌рый всем земны‌м, на похвалу‌ всех подвизая вопи‌ти к тебе‌ си‌це Ра‌дуйся, Нико‌лае, вели‌кий Чудотво‌рче» <br/> <br/> <i>Акафист свт Николаю</i>     
</div>
        <Button type="primary" size="large" className='title-button'>
          записаться к нам
        </Button>
      </div>

      {/* Кнопка возврата наверх */}
      <BackTop>
        <Button
          type="primary"
          shape="circle"
          icon={<VerticalAlignTopOutlined />}
          size="large"
          style={{
            backgroundColor: '#bda57e',
            border: 'none',
            color: 'white',
          }}
        />
      </BackTop>
    </div>
  );
};

export default FirstPage;
