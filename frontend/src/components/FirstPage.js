import React, { useState } from 'react';
import '../App.css';
import logo from '../assets/logo.png'; // Импорт логотипа
import { DownloadOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, Drawer } from 'antd';
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
              to="second-page" // ID целевого блока
              smooth={true} // Плавная прокрутка
              duration={500} // Длительность прокрутки (в миллисекундах)
              className="nav-button"
            >
              о монастыре
          </Link>
          <Link
              to="fifth-page" // ID целевого блока
              smooth={true} // Плавная прокрутка
              duration={500} // Длительность прокрутки (в миллисекундах)
              className="nav-button"
            >
              услуги
          </Link>
          <Link
              to="third-page" // ID целевого блока
              smooth={true} // Плавная прокрутка
              duration={500} // Длительность прокрутки (в миллисекундах)
              className="nav-button"
            >
              о настоятеле
          </Link>
          <Link
              to="seven-page" // ID целевого блока
              smooth={true} // Плавная прокрутка
              duration={500} // Длительность прокрутки (в миллисекундах)
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
        style={{backgroundColor: 'black'}}
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <div className="drawer-menu">
          <button className="nav-button" onClick={closeDrawer}>о монастыре</button>
          <button className="nav-button" onClick={closeDrawer}>услуги</button>
          <button className="nav-button" onClick={closeDrawer}>о настоятеле</button>
          <button className="nav-button" onClick={closeDrawer}>контакты</button>
          <button className="contact-button" onClick={closeDrawer}>cвязаться с нами</button>
        </div>
      </Drawer>

      <div className='title-page-block'>
        <div className='title-page'>
          Никольский Угрешский <br />мужской монастырь
        </div>
        <div className='subtitle-page'>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et nasc
        </div>
        <Button type="primary" size="large" className='title-button'>
          записаться к нам
        </Button>
      </div>
    </div>
  );
};

export default FirstPage;