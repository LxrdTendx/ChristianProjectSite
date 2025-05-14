import React, { useState } from 'react';
import '../App.css';
import logo from '../assets/logo.png'; // Импорт логотипа
import { MenuOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { Button, Drawer, BackTop } from 'antd';
import { Link as RouterLink } from 'react-router-dom'; // Для навигации на новую страницу
import { Link as ScrollLink } from 'react-scroll'; // Для скроллинга внутри страницы


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
          {/* Кнопки навигации */}
          <ScrollLink
            to="second-page" // ID блока на главной странице
            smooth={true}
            duration={500}
            className="nav-button"
          >
            о монастыре
          </ScrollLink>

          <RouterLink to="/services" className="nav-button"> {/* На новую страницу */}
           Таинства и Богослужения
          </RouterLink>

          <ScrollLink
            to="third-page" // ID блока на главной странице
            smooth={true}
            duration={500}
            className="nav-button"
          >
            о священнике
          </ScrollLink>

          <ScrollLink
            to="seven-page" // ID блока на главной странице
            smooth={true}
            duration={500}
            className="nav-button"
          >
            контакты
          </ScrollLink>
        </nav>

        {/* Кнопка "Связаться с нами" */}
        <div className="contact-button-container">
          <ScrollLink
            to="contact-form" // ID формы на главной странице
            smooth={true}
            duration={500}
            className="contact-button"
          >
            связаться с нами
          </ScrollLink>
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
          {/* Навигация в Drawer */}
          <ScrollLink
            to="second-page"
            smooth={true}
            duration={500}
            className="nav-button"
            onClick={closeDrawer}
          >
            о монастыре
          </ScrollLink>

          <RouterLink
            to="/services"
            className="nav-button"
            onClick={closeDrawer}
          >
            Таинства и Богослужения
          </RouterLink>

          <ScrollLink
            to="third-page"
            smooth={true}
            duration={500}
            className="nav-button"
            onClick={closeDrawer}
          >
            о священнике
          </ScrollLink>

          <ScrollLink
            to="seven-page"
            smooth={true}
            duration={500}
            className="nav-button"
            onClick={closeDrawer}
          >
            контакты
          </ScrollLink>

          <ScrollLink
            to="contact-form"
            smooth={true}
            duration={500}
            className="contact-button"
            onClick={closeDrawer}
          >
            связаться с нами
          </ScrollLink>
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
            backgroundColor: '#EDCB92',
            border: 'none',
            color: 'white',
          }}
        />
      </BackTop>
    </div>
  );
};

export default FirstPage;
